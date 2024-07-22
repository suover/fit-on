package com.spring.myapp.security;

import java.util.List;

/**
 * JWT 인증 응답 클래스.
 * JWT 인증에 대한 응답 데이터를 담고 있습니다.
 */
public class JwtAuthenticationResponse {
	private String accessToken;
	private String refreshToken;
	private List<String> roles;
	private String nickname;
	private Long userId;
	private String name;

	/**
	 * JwtAuthenticationResponse 생성자.
	 *
	 * @param accessToken 액세스 토큰
	 * @param refreshToken 리프레시 토큰
	 * @param roles 사용자 역할 목록
	 * @param nickname 사용자 닉네임
	 * @param userId 사용자 ID
	 * @param name 사용자 이름
	 */
	public JwtAuthenticationResponse(String accessToken, String refreshToken, List<String> roles, String nickname,
		Long userId, String name) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.roles = roles;
		this.nickname = nickname;
		this.userId = userId;
		this.name = name;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public List<String> getRoles() {
		return roles;
	}

	public String getNickname() {
		return nickname;
	}

	public Long getUserId() {
		return userId;
	}

	public String getName() {
		return name;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setName(String name) {
		this.name = name;
	}
}
