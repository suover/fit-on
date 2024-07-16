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

@Service
public class AuthService {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private UserService userService;

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

	public void addRefreshTokenToCookie(String refreshToken, HttpServletResponse response) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge((int)jwtTokenProvider.getRefreshTokenExpiration() / 1000);
		response.addCookie(refreshTokenCookie);
	}

	public void removeRefreshTokenFromCookie(HttpServletResponse response) {
		Cookie refreshTokenCookie = new Cookie("refreshToken", null);
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setMaxAge(0); // 쿠키 만료 설정
		response.addCookie(refreshTokenCookie);
	}

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
