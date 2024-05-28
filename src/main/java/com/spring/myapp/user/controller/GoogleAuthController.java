package com.spring.myapp.user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.user.service.GoogleAuthService;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {

	@Autowired
	private GoogleAuthService googleAuthService;

	@PostMapping("/google")
	public ResponseEntity<JwtAuthenticationResponse> authenticateGoogle(@RequestBody Map<String, String> payload) {
		String token = payload.get("token");
		if (token == null) {
			return ResponseEntity.badRequest().body(null);
		}

		try {
			return googleAuthService.verifyGoogleToken(token);
		} catch (Exception e) {
			return ResponseEntity.status(401).body(null);
		}
	}
}
