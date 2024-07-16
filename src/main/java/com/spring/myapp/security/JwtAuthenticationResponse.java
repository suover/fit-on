package com.spring.myapp.security;

import java.util.List;

public class JwtAuthenticationResponse {
	private String accessToken;
	private String refreshToken;
	private List<String> roles;
	private String nickname;
	private Long userId;
	private String name;

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
