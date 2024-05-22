package com.spring.myapp.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.security.JwtTokenProvider;
import com.spring.myapp.user.model.User;
import com.spring.myapp.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		logger.debug("Request to register user: {}", user);
		userService.register(user);

		// JWT 토큰 생성
		String token = jwtTokenProvider.createToken(user.getEmail());
		logger.info("User registered successfully: {}", user.getEmail());

		return ResponseEntity.ok(new JwtAuthenticationResponse(token));
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

	// JWT 인증 응답 클래스
	public static class JwtAuthenticationResponse {
		private String token;

		public JwtAuthenticationResponse(String token) {
			this.token = token;
		}

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}
	}
}
