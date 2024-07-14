package com.spring.myapp.user.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.spring.myapp.security.AuthService;
import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.security.JwtTokenProvider;
import com.spring.myapp.user.model.User;
import com.spring.myapp.user.model.UserSocialLogin;
import com.spring.myapp.user.repository.UserMapper;
import com.spring.myapp.user.repository.UserSocialLoginMapper;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class KakaoAuthService {

	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	private String clientId;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private UserSocialLoginMapper userSocialLoginMapper;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthService authService;

	public ResponseEntity<JwtAuthenticationResponse> verifyKakaoToken(String kakaoAccessToken,
		HttpServletResponse response) {
		String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + kakaoAccessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
		Map<String, Object> kakaoAccount = (Map<String, Object>)userInfoResponse.getBody().get("kakao_account");
		String email = (String)kakaoAccount.get("email");
		String nickname = (String)((Map<String, Object>)kakaoAccount.get("profile")).get("nickname");

		String providerId = String.valueOf(userInfoResponse.getBody().get("id"));

		if (email == null || email.isEmpty()) {
			email = generateTemporaryEmail(providerId);
		}

		User user = getUser("kakao", providerId, email, nickname);
		List<String> roles = userMapper.getUserRoles(user.getUserId()).stream()
			.map(role -> "ROLE_" + role)
			.collect(Collectors.toList());
		String accessToken = jwtTokenProvider.createAccessToken(user.getEmail(), roles, user.getNickname(),
			user.getUserId(), user.getName());
		String refreshToken = jwtTokenProvider.createRefreshToken(user.getEmail());

		// 리프레시 토큰을 쿠키에 저장
		authService.addRefreshTokenToCookie(refreshToken, response);

		return ResponseEntity.ok(
			new JwtAuthenticationResponse(accessToken, refreshToken, roles, user.getNickname(), user.getUserId(),
				user.getName()));
	}

	public void logoutKakaoUser(String kakaoAccessToken) {
		String logoutUrl = "https://kapi.kakao.com/v1/user/logout";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + kakaoAccessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		RestTemplate restTemplate = new RestTemplate();
		restTemplate.exchange(logoutUrl, HttpMethod.POST, entity, Map.class);
	}

	private String generateTemporaryEmail(String providerId) {
		return providerId + "@kakao.com";
	}

	private User getUser(String provider, String providerId, String email, String nickname) {
		UserSocialLogin userSocialLogin = userSocialLoginMapper.findByProviderAndProviderId(provider, providerId);
		User user;
		if (userSocialLogin == null) {
			user = createUser(email, nickname, provider, providerId);
		} else {
			user = userMapper.findById(userSocialLogin.getUserId());
		}
		return user;
	}

	private User createUser(String email, String nickname, String provider, String providerId) {
		LocalDateTime now = LocalDateTime.now();
		User newUser = new User();
		newUser.setEmail(email);
		newUser.setName(nickname != null ? nickname : ""); // 이름이 없는 경우 기본값 설정
		newUser.setPassword(""); // 기본값으로 빈 문자열 설정
		newUser.setNickname(nickname);
		newUser.setPhone(""); // 기본값으로 빈 문자열 설정
		newUser.setBirthDate(now.toLocalDate()); // 기본값으로 현재 날짜 설정
		newUser.setJoinDate(now);
		newUser.setActive(true);
		userMapper.save(newUser);

		UserSocialLogin userSocialLogin = new UserSocialLogin();
		userSocialLogin.setUserId(newUser.getUserId());
		userSocialLogin.setProvider(provider);
		userSocialLogin.setProviderId(providerId);
		userSocialLoginMapper.save(userSocialLogin);

		userMapper.saveUserRole(newUser.getUserId(), "user");

		return newUser;
	}
}
