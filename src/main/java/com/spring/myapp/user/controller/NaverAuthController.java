package com.spring.myapp.user.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.user.service.NaverAuthService;

@RestController
@RequestMapping("/api/auth")
public class NaverAuthController {

	@Autowired
	private NaverAuthService naverAuthService;

	@GetMapping("/naver/callback")
	public ResponseEntity<Void> handleNaverCallback(
		@RequestParam("code") String code,
		@RequestParam("state") String state,
		UriComponentsBuilder uriComponentsBuilder) {
		try {
			JwtAuthenticationResponse response = naverAuthService.processNaverLogin(code, state);

			String redirectUrl = uriComponentsBuilder.path("/login-success")
				.queryParam("token", response.getToken())
				.queryParam("roles", String.join(",", response.getRoles()))
				.queryParam("nickname", response.getNickname())
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
