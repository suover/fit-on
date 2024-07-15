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

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
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

	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		userService.register(user);
		return ResponseEntity.ok("User registered successfully");
	}

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

	@PostMapping("/auth/logout")
	public ResponseEntity<?> logoutUser(HttpServletResponse response) {
		authService.removeRefreshTokenFromCookie(response);
		return ResponseEntity.ok("Logged out successfully");
	}

	@PostMapping("/auth/refresh")
	public ResponseEntity<?> refreshToken(@CookieValue("refreshToken") String refreshToken) {
		try {
			JwtAuthenticationResponse authResponse = authService.refreshToken(refreshToken);
			return ResponseEntity.ok(authResponse);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(401).body("Invalid refresh token");
		}
	}

	@GetMapping("/check-email")
	public ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam("email") String email) {
		boolean isDuplicate = userService.isEmailDuplicate(email);
		return ResponseEntity.ok(isDuplicate);
	}

	@GetMapping("/check-nickname")
	public ResponseEntity<Boolean> checkNicknameDuplicate(@RequestParam("nickname") String nickname) {
		boolean isDuplicate = userService.isNicknameDuplicate(nickname);
		return ResponseEntity.ok(isDuplicate);
	}
}
