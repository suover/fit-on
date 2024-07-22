package com.spring.myapp.user.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.spring.myapp.security.AuthService;
import com.spring.myapp.security.JwtAuthenticationResponse;
import com.spring.myapp.security.JwtTokenProvider;
import com.spring.myapp.user.model.User;
import com.spring.myapp.user.model.UserSocialLogin;
import com.spring.myapp.user.repository.UserMapper;
import com.spring.myapp.user.repository.UserSocialLoginMapper;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Google 인증 서비스 클래스.
 * Google OAuth2를 통해 사용자 인증을 처리합니다.
 */
@Service
public class GoogleAuthService {

	@Value("${spring.security.oauth2.client.registration.google.client-id}")
	private String clientId;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private UserSocialLoginMapper userSocialLoginMapper;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthService authService;

	/**
	 * Google 토큰을 검증하고 JWT 인증 응답을 반환합니다.
	 *
	 * @param token Google ID 토큰
	 * @param response HTTP 응답 객체
	 * @return JWT 인증 응답
	 * @throws Exception 유효하지 않은 ID 토큰의 경우 예외 발생
	 */
	public ResponseEntity<JwtAuthenticationResponse> verifyGoogleToken(String token,
		HttpServletResponse response) throws Exception {
		JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(GoogleNetHttpTransport.newTrustedTransport(),
			jsonFactory)
			.setAudience(Collections.singletonList(clientId))
			.build();

		GoogleIdToken idToken = verifier.verify(token);
		if (idToken == null) {
			throw new Exception("Invalid ID token");
		}

		GoogleIdToken.Payload payload = idToken.getPayload();
		String email = payload.getEmail();
		String name = (String)payload.get("name");
		String providerId = payload.getSubject();

		User user = getUser("google", providerId, email, name);
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

	/**
	 * 소셜 로그인 사용자를 가져오거나 새 사용자로 등록합니다.
	 *
	 * @param provider 소셜 로그인 제공자
	 * @param providerId 제공자 ID
	 * @param email 사용자 이메일
	 * @param name 사용자 이름
	 * @return User 객체
	 */
	private User getUser(String provider, String providerId, String email, String name) {
		UserSocialLogin userSocialLogin = userSocialLoginMapper.findByProviderAndProviderId(provider, providerId);
		User user;
		if (userSocialLogin == null) {
			user = createUser(email, name, provider, providerId);
		} else {
			user = userMapper.findById(userSocialLogin.getUserId());
		}
		return user;
	}

	/**
	 * 새로운 사용자를 생성합니다.
	 *
	 * @param email 사용자 이메일
	 * @param name 사용자 이름
	 * @param provider 소셜 로그인 제공자
	 * @param providerId 제공자 ID
	 * @return 생성된 User 객체
	 */
	private User createUser(String email, String name, String provider, String providerId) {
		LocalDateTime now = LocalDateTime.now();
		User newUser = new User();
		newUser.setEmail(email);
		newUser.setName(name != null ? name : ""); // 이름이 없는 경우 기본값 설정
		newUser.setPassword(""); // 기본값으로 빈 문자열 설정
		newUser.setNickname(email); // 이메일을 닉네임으로 설정
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
