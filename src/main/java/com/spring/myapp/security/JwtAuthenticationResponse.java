package com.spring.myapp.security;

import java.util.List;

public class JwtAuthenticationResponse {
	private String token;
	private List<String> roles;
	private String nickname;
	private Long userId;
	private String name;

	public JwtAuthenticationResponse(String token, List<String> roles, String nickname, Long userId, String name) {
		this.token = token;
		this.roles = roles;
		this.nickname = nickname;
		this.userId = userId;
		this.name = name;
	}

	public String getToken() {
		return token;
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

	public void setToken(String token) {
		this.token = token;
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
