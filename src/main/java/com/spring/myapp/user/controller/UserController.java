package com.spring.myapp.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.security.AuthService;
import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.security.JwtTokenProvider;
import com.spring.myapp.user.model.LoginRequest;
import com.spring.myapp.user.model.User;
import com.spring.myapp.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

/**
 * 사용자 관련 API를 제공하는 컨트롤러 클래스.
 */
@RestController
@RequestMapping("/api")
@Tag(name = "User Controller", description = "사용자 관련 API")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthService authService;

	/**
	 * 새로운 사용자를 등록합니다.
	 *
	 * @param user 사용자 정보
	 * @return 성공 메시지
	 */
	@Operation(summary = "사용자 등록", description = "새로운 사용자를 등록합니다.")
	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		userService.register(user);
		return ResponseEntity.ok("User registered successfully");
	}

	/**
	 * 사용자 로그인 요청을 처리합니다.
	 *
	 * @param loginRequest 로그인 요청 정보
	 * @param response HTTP 응답
	 * @return JWT 인증 응답
	 */
	@Operation(summary = "사용자 로그인", description = "사용자 로그인 요청을 처리합니다.")
	@PostMapping("/auth/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
		HttpServletResponse response) {
		try {
			JwtAuthenticationResponse authResponse = authService.authenticateUser(loginRequest.getEmail(),
				loginRequest.getPassword(), authenticationManager, response);
			return ResponseEntity.ok(authResponse);
		} catch (Exception e) {
			logger.error("User authentication failed: {}", loginRequest.getEmail(), e);
			return ResponseEntity.status(401).body("Authentication failed");
		}
	}

	/**
	 * 사용자 로그아웃 요청을 처리합니다.
	 *
	 * @param response HTTP 응답
	 * @return 성공 메시지
	 */
	@Operation(summary = "사용자 로그아웃", description = "사용자 로그아웃 요청을 처리합니다.")
	@PostMapping("/auth/logout")
	public ResponseEntity<?> logoutUser(HttpServletResponse response) {
		authService.removeRefreshTokenFromCookie(response);
		return ResponseEntity.ok("Logged out successfully");
	}

	/**
	 * 리프레시 토큰을 이용해 새로운 액세스 토큰을 생성합니다.
	 *
	 * @param refreshToken 리프레시 토큰
	 * @return JWT 인증 응답
	 */
	@Operation(summary = "리프레시 토큰을 이용한 액세스 토큰 갱신", description = "리프레시 토큰을 이용해 새로운 액세스 토큰을 생성합니다.")
	@PostMapping("/auth/refresh")
	public ResponseEntity<?> refreshToken(@CookieValue("refreshToken") String refreshToken) {
		try {
			JwtAuthenticationResponse authResponse = authService.refreshToken(refreshToken);
			return ResponseEntity.ok(authResponse);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(401).body("Invalid refresh token");
		}
	}

	/**
	 * 이메일 중복 여부를 확인합니다.
	 *
	 * @param email 이메일 주소
	 * @return 중복 여부
	 */
	@Operation(summary = "이메일 중복 확인", description = "이메일 중복 여부를 확인합니다.")
	@GetMapping("/check-email")
	public ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam("email") String email) {
		boolean isDuplicate = userService.isEmailDuplicate(email);
		return ResponseEntity.ok(isDuplicate);
	}

	/**
	 * 닉네임 중복 여부를 확인합니다.
	 *
	 * @param nickname 닉네임
	 * @return 중복 여부
	 */
	@Operation(summary = "닉네임 중복 확인", description = "닉네임 중복 여부를 확인합니다.")
	@GetMapping("/check-nickname")
	public ResponseEntity<Boolean> checkNicknameDuplicate(@RequestParam("nickname") String nickname) {
		boolean isDuplicate = userService.isNicknameDuplicate(nickname);
		return ResponseEntity.ok(isDuplicate);
	}
}
