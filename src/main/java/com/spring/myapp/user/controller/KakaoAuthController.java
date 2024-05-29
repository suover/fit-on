package com.spring.myapp.user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.user.service.KakaoAuthService;

@RestController
@RequestMapping("/api/auth")
public class KakaoAuthController {

	@Autowired
	private KakaoAuthService kakaoAuthService;

	@PostMapping("/kakao")
	public ResponseEntity<JwtAuthenticationResponse> authenticateKakao(@RequestBody Map<String, String> payload) {
		String kakaoAccessToken = payload.get("kakaoAccessToken");
		if (kakaoAccessToken == null) {
			return ResponseEntity.badRequest().body(null);
		}

		try {
			return kakaoAuthService.verifyKakaoToken(kakaoAccessToken);
		} catch (Exception e) {
			return ResponseEntity.status(401).body(null);
		}
	}

	@PostMapping("/kakao/logout")
	public ResponseEntity<String> logoutKakao(@RequestHeader("Authorization") String kakaoAccessToken) {
		String cleanedToken = kakaoAccessToken.replace("Bearer ", "");

		try {
			kakaoAuthService.logoutKakaoUser(cleanedToken);
			return ResponseEntity.ok("로그아웃 성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("로그아웃 실패");
		}
	}
}
