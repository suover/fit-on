package com.spring.myapp.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.spring.myapp.user.model.User;
import com.spring.myapp.user.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 인증 서비스 클래스.
 * 사용자 인증 및 토큰 관리를 담당합니다.
 */
@Service
public class AuthService {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private UserService userService;

	/**
	 * 사용자 인증을 수행하고 JWT 토큰을 생성합니다.
	 *
	 * @param email 사용자 이메일
	 * @param password 사용자 비밀번호
	 * @param authenticationManager 인증 관리자
	 * @param response HTTP 응답
	 * @return JwtAuthenticationResponse JWT 인증 응답 객체
	 */
	public JwtAuthenticationResponse authenticateUser(String email, String password,
		AuthenticationManager authenticationManager, HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				email,
				password
			)
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = userService.findByEmail(email);
		List<String> roles = userService.getUserRoles(user.getUserId()).stream()
			.map(role -> "ROLE_" + role)
			.collect(Collectors.toList());
		String accessToken = jwtTokenProvider.createAccessToken(authentication.getName(), roles, user.getNickname(),
			user.getUserId(), user.getName());
		String refreshToken = jwtTokenProvider.createRefreshToken(authentication.getName());

		addRefreshTokenToCookie(refreshToken, response);

		return new JwtAuthenticationResponse(accessToken, refreshToken, roles, user.getNickname(), user.getUserId(),
			user.getName());
	}

	/**
	 * 리프레시 토큰을 쿠키에 추가합니다.
	 *
	 * @param refreshToken 리프레시 토큰
	 * @param response HTTP 응답
	 */
	public void addRefreshTokenToCookie(String refreshToken, HttpServletResponse response) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge((int)jwtTokenProvider.getRefreshTokenExpiration() / 1000);
		response.addCookie(refreshTokenCookie);
	}

	/**
	 * 쿠키에서 리프레시 토큰을 제거합니다.
	 *
	 * @param response HTTP 응답
	 */
	public void removeRefreshTokenFromCookie(HttpServletResponse response) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", null);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(0); // 쿠키 만료 설정
		response.addCookie(refreshTokenCookie);
	}

	/**
	 * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 생성합니다.
	 *
	 * @param refreshToken 리프레시 토큰
	 * @return JwtAuthenticationResponse JWT 인증 응답 객체
	 * @throws IllegalArgumentException 리프레시 토큰이 유효하지 않은 경우
	 */
	public JwtAuthenticationResponse refreshToken(String refreshToken) {
		if (jwtTokenProvider.validateToken(refreshToken)) {
			String username = jwtTokenProvider.getUsernameFromToken(refreshToken);
			User user = userService.findByEmail(username);
			List<String> roles = userService.getUserRoles(user.getUserId()).stream()
				.map(role -> "ROLE_" + role)
				.collect(Collectors.toList());
			String newAccessToken = jwtTokenProvider.createAccessToken(username, roles, user.getNickname(),
				user.getUserId(), user.getName());
			return new JwtAuthenticationResponse(newAccessToken, refreshToken, roles, user.getNickname(),
				user.getUserId(),
				user.getName());
		} else {
			throw new IllegalArgumentException("Invalid refresh token");
		}
	}
}
