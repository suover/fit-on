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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Google 인증 관련 API를 제공하는 컨트롤러 클래스.
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Google Auth Controller", description = "Google 인증 관련 API")
public class GoogleAuthController {

	@Autowired
	private GoogleAuthService googleAuthService;

	/**
	 * Google 토큰을 이용한 사용자 인증을 처리합니다.
	 *
	 * @param payload 인증 요청 정보
	 * @param response HTTP 응답
	 * @return JWT 인증 응답
	 */
	@Operation(summary = "Google 사용자 인증", description = "Google 토큰을 이용한 사용자 인증을 처리합니다.")
	@PostMapping("/google")
	public ResponseEntity<JwtAuthenticationResponse> authenticateGoogle(@RequestBody Map<String, String> payload,
		HttpServletResponse response) {
		String token = payload.get("token");
		if (token == null) {
			return ResponseEntity.badRequest().body(null);
		}

		try {
			return googleAuthService.verifyGoogleToken(token, response);
		} catch (Exception e) {
			return ResponseEntity.status(401).body(null);
		}
	}
}
