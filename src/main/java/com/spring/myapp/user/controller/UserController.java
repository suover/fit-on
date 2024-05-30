package com.spring.myapp.user.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.security.JwtTokenProvider;
import com.spring.myapp.user.model.LoginRequest;
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
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		userService.register(user);

		// JWT 토큰 생성
		List<String> roles = userService.getUserRoles(user.getUserId());
		String token = jwtTokenProvider.createToken(user.getEmail(), roles, user.getNickname(), user.getUserId(),
			user.getName());

		return ResponseEntity.ok(
			new JwtAuthenticationResponse(token, roles, user.getNickname(), user.getUserId(), user.getName()));
	}

	@PostMapping("/auth/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
					loginRequest.getEmail(),
					loginRequest.getPassword()
				)
			);

			SecurityContextHolder.getContext().setAuthentication(authentication);

			User user = userService.findByEmail(loginRequest.getEmail());
			List<String> roles = userService.getUserRoles(user.getUserId());
			roles = roles.stream().map(role -> "ROLE_" + role).collect(Collectors.toList());
			String jwt = jwtTokenProvider.createToken(authentication.getName(), roles, user.getNickname(),
				user.getUserId(), user.getName());

			return ResponseEntity.ok(
				new JwtAuthenticationResponse(jwt, roles, user.getNickname(), user.getUserId(), user.getName()));
		} catch (Exception e) {
			logger.error("User authentication failed: {}", loginRequest.getEmail(), e);
			return ResponseEntity.status(401).body("Authentication failed");
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
