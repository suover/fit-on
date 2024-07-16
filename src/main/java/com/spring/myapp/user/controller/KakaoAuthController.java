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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Kakao 인증 관련 API를 제공하는 컨트롤러 클래스.
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Kakao Auth Controller", description = "Kakao 인증 관련 API")
public class KakaoAuthController {

	@Autowired
	private KakaoAuthService kakaoAuthService;

	/**
	 * Kakao 토큰을 이용한 사용자 인증을 처리합니다.
	 *
	 * @param payload 인증 요청 정보
	 * @param response HTTP 응답
	 * @return JWT 인증 응답
	 */
	@Operation(summary = "Kakao 사용자 인증", description = "Kakao 토큰을 이용한 사용자 인증을 처리합니다.")
	@PostMapping("/kakao")
	public ResponseEntity<JwtAuthenticationResponse> authenticateKakao(@RequestBody Map<String, String> payload,
		HttpServletResponse response) {
		String kakaoAccessToken = payload.get("kakaoAccessToken");
		if (kakaoAccessToken == null) {
			return ResponseEntity.badRequest().body(null);
		}

		try {
			return kakaoAuthService.verifyKakaoToken(kakaoAccessToken, response);
		} catch (Exception e) {
			return ResponseEntity.status(401).body(null);
		}
	}

	/**
	 * Kakao 사용자를 로그아웃합니다.
	 *
	 * @param kakaoAccessToken Kakao 액세스 토큰
	 * @return 로그아웃 성공 메시지
	 */
	@Operation(summary = "Kakao 사용자 로그아웃", description = "Kakao 사용자를 로그아웃합니다.")
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
