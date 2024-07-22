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

/**
 * 네이버 인증 서비스 클래스.
 * 네이버 OAuth2를 통해 사용자 인증을 처리합니다.
 */
@Service
public class NaverAuthService {

	@Value("${spring.security.oauth2.client.registration.naver.client-id}")
	private String clientId;

	@Value("${spring.security.oauth2.client.registration.naver.client-secret}")
	private String clientSecret;

	@Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
	private String redirectUri;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private UserSocialLoginMapper userSocialLoginMapper;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthService authService;

	/**
	 * 네이버 로그인을 처리하고 JWT 인증 응답을 반환합니다.
	 *
	 * @param code 네이버 인증 코드
	 * @param state 네이버 인증 상태
	 * @param response HTTP 응답 객체
	 * @return JWT 인증 응답
	 */
	public JwtAuthenticationResponse processNaverLogin(String code, String state, HttpServletResponse response) {
		String tokenUrl = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code"
			+ "&client_id=" + clientId
			+ "&client_secret=" + clientSecret
			+ "&code=" + code
			+ "&state=" + state;

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> tokenResponse = restTemplate.exchange(tokenUrl, HttpMethod.GET, null, Map.class);
		String naverAccessToken = (String)tokenResponse.getBody().get("access_token");

		// 사용자 정보 요청
		String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + naverAccessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);
		ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);

		Map<String, Object> responseBody = (Map<String, Object>)userInfoResponse.getBody().get("response");
		String email = (String)responseBody.get("email");
		String name = (String)responseBody.get("name");
		String providerId = (String)responseBody.get("id");

		User user = getUser("naver", providerId, email, name);
		List<String> roles = userMapper.getUserRoles(user.getUserId()).stream()
			.map(role -> "ROLE_" + role)
			.collect(Collectors.toList());
		String accessToken = jwtTokenProvider.createAccessToken(user.getEmail(), roles, user.getNickname(),
			user.getUserId(), user.getName());
		String refreshToken = jwtTokenProvider.createRefreshToken(user.getEmail());

		// 리프레시 토큰을 쿠키에 저장
		authService.addRefreshTokenToCookie(refreshToken, response);

		return new JwtAuthenticationResponse(accessToken, refreshToken, roles, user.getNickname(), user.getUserId(),
			user.getName());
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
