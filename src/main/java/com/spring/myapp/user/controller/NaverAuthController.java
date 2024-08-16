package com.spring.myapp.user.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.user.service.NaverAuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Naver 인증 관련 API를 제공하는 컨트롤러 클래스.
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Naver Auth Controller", description = "Naver 인증 관련 API")
public class NaverAuthController {

	@Value("${server.serverAddress}")
	private String serverAddress;

	@Autowired
	private NaverAuthService naverAuthService;

	/**
	 * Naver 인증 콜백을 처리합니다.
	 *
	 * @param code 인증 코드
	 * @param state 인증 상태
	 * @param uriComponentsBuilder URI 컴포넌트 빌더
	 * @param response HTTP 응답
	 * @return 리디렉션 응답
	 */
	@Operation(summary = "Naver 인증 콜백 처리", description = "Naver 인증 콜백을 처리합니다.")
	@GetMapping("/naver/callback")
	public ResponseEntity<Void> handleNaverCallback(
		@RequestParam("code") String code,
		@RequestParam("state") String state,
		UriComponentsBuilder uriComponentsBuilder,
		HttpServletResponse response) {
		try {
			JwtAuthenticationResponse jwtResponse = naverAuthService.processNaverLogin(code, state, response);

			String redirectUrl = uriComponentsBuilder
				.scheme("localhost".equals(serverAddress) ? "http" : "https")
				.host("localhost".equals(serverAddress) ? "localhost" : "fiton.kr")
				.port("localhost".equals(serverAddress) ? 3000 : -1)
				.path("/login-success")
				.queryParam("accessToken", jwtResponse.getAccessToken())
				.build().toUriString();

			HttpHeaders headers = new HttpHeaders();
			headers.setLocation(URI.create(redirectUrl));
			return ResponseEntity.status(302).headers(headers).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(401).build();
		}
	}
}
