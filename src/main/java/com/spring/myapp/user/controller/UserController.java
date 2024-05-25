package com.spring.myapp.user.controller;

import java.util.List;
import java.util.Map;
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

import com.spring.myapp.security.JwtTokenProvider;
import com.spring.myapp.user.model.LoginRequest;
import com.spring.myapp.user.model.User;
import com.spring.myapp.user.service.CustomOAuth2UserService;
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

	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		userService.register(user);

		// JWT 토큰 생성
		List<String> roles = userService.getUserRoles(user.getUserId());
		String token = jwtTokenProvider.createToken(user.getEmail(), roles, user.getNickname());

		return ResponseEntity.ok(new JwtAuthenticationResponse(token, roles, user.getNickname()));
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
			List<String> roles = authentication.getAuthorities().stream()
				.map(authority -> authority.getAuthority())
				.collect(Collectors.toList());
			User user = userService.findByEmail(loginRequest.getEmail());
			String jwt = jwtTokenProvider.createToken(authentication.getName(), roles, user.getNickname());

			return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, roles, user.getNickname()));
		} catch (Exception e) {
			logger.error("User authentication failed: {}", loginRequest.getEmail(), e);
			return ResponseEntity.status(401).body("Authentication failed");
		}
	}

	@PostMapping("/auth/oauth2")
	public ResponseEntity<?> authenticateOAuth2User(@RequestBody Map<String, String> body) {
		String token = body.get("token");
		String provider = body.get("provider");

		try {
			User user = customOAuth2UserService.processOAuth2Login(provider, token);
			List<String> roles = userService.getUserRoles(user.getUserId());
			String jwt = jwtTokenProvider.createToken(user.getEmail(), roles, user.getNickname());

			return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, roles, user.getNickname()));
		} catch (Exception e) {
			logger.error("{} user authentication failed", provider, e);
			return ResponseEntity.status(401).body(provider + " authentication failed");
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

	// JWT 인증 응답 클래스
	public static class JwtAuthenticationResponse {
		private String token;
		private List<String> roles;
		private String nickname;

		public JwtAuthenticationResponse(String token, List<String> roles, String nickname) {
			this.token = token;
			this.roles = roles;
			this.nickname = nickname;
		}

		public String getToken() {
			return token;
		}

		public List<String> getRoles() {
			return roles;
		}

		public String getNickname() {
			return nickname;
		}

		public void setToken(String token) {
			this.token = token;
		}

		public void setRoles(List<String> roles) {
			this.roles = roles;
		}

		public void setNickname(String nickname) {
			this.nickname = nickname;
		}
	}
}
