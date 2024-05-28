package com.spring.myapp.security;

import java.util.List;

public class JwtAuthenticationResponse {
	private String token;
	private List<String> roles;
	private String nickname;

	public JwtAuthenticationResponse(String token, List<String> roles, String nickname) {
		this.token = token;
		this.roles = roles;
		this.nickname = nickname;
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

	public void setToken(String token) {
		this.token = token;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
}
