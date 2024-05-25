package com.spring.myapp.user.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.spring.myapp.user.model.User;
import com.spring.myapp.user.model.UserSocialLogin;
import com.spring.myapp.user.repository.UserMapper;
import com.spring.myapp.user.repository.UserSocialLoginMapper;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserMapper userMapper;
	private final UserSocialLoginMapper userSocialLoginMapper;

	@Autowired
	private Environment env;

	public CustomOAuth2UserService(UserMapper userMapper, UserSocialLoginMapper userSocialLoginMapper) {
		this.userMapper = userMapper;
		this.userSocialLoginMapper = userSocialLoginMapper;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		return processOAuth2User(userRequest, oAuth2User);
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
		String provider = userRequest.getClientRegistration().getRegistrationId();
		String providerId = getProviderId(oAuth2User.getAttributes(), provider);
		String email = oAuth2User.getAttribute("email");
		String name = oAuth2User.getAttribute("name");

		UserSocialLogin userSocialLogin = userSocialLoginMapper.findByProviderAndProviderId(provider, providerId);
		if (userSocialLogin == null) {
			createUser(email, name, provider, providerId);
		}

		return oAuth2User;
	}

	public User processOAuth2Login(String provider, String token) {
		if ("google".equals(provider)) {
			return processGoogleLogin(token);
		} else {
			return processGenericOAuth2Login(provider, token);
		}
	}

	private User processGoogleLogin(String token) {
		String tokenInfoUri =
			env.getProperty("spring.security.oauth2.client.provider.google.token-info-uri") + "?id_token=" + token;

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> response = restTemplate.exchange(tokenInfoUri, HttpMethod.GET, null, Map.class);
		Map<String, Object> userInfo = response.getBody();

		String providerId = (String)userInfo.get("sub");
		String email = (String)userInfo.get("email");
		String name = (String)userInfo.get("name");

		return getUser(providerId, "google", email, name);
	}

	private User processGenericOAuth2Login(String provider, String token) {
		OAuth2UserRequest userRequest = new OAuth2UserRequest(null, null);
		OAuth2User oAuth2User = loadUser(userRequest);

		String providerId = getProviderId(oAuth2User.getAttributes(), provider);
		String email = oAuth2User.getAttribute("email");
		String name = oAuth2User.getAttribute("name");

		return getUser(providerId, provider, email, name);
	}

	private User getUser(String providerId, String provider, String email, String name) {
		UserSocialLogin userSocialLogin = userSocialLoginMapper.findByProviderAndProviderId(provider, providerId);
		User user;
		if (userSocialLogin == null) {
			user = createUser(email, name, provider, providerId);
		} else {
			user = userMapper.findById(userSocialLogin.getUserId());
		}
		return user;
	}

	private User createUser(String email, String name, String provider, String providerId) {
		LocalDateTime now = LocalDateTime.now();
		User newUser = new User();
		newUser.setEmail(email);
		newUser.setName(name != null ? name : "");
		newUser.setPassword("");
		newUser.setNickname(email);
		newUser.setPhone("");
		newUser.setBirthDate(now.toLocalDate());  // 가입한 날짜로 생년월일 설정
		newUser.setJoinDate(now);
		newUser.setActive(true);
		userMapper.save(newUser);

		UserSocialLogin userSocialLogin = new UserSocialLogin();
		userSocialLogin.setUserId(newUser.getUserId());
		userSocialLogin.setProvider(provider);
		userSocialLogin.setProviderId(providerId);
		userSocialLoginMapper.save(userSocialLogin);

		userMapper.saveUserRole(newUser.getUserId(), "USER");

		return newUser;
	}

	private String getProviderId(Map<String, Object> userInfo, String provider) {
		switch (provider) {
			case "google":
				return (String)userInfo.get("sub");
			case "naver":
				return (String)userInfo.get("id");
			case "kakao":
				return (String)userInfo.get("id");
			default:
				throw new IllegalArgumentException("Unsupported provider: " + provider);
		}
	}
}
