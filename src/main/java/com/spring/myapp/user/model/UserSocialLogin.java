package com.spring.myapp.user.model;

import lombok.Data;

@Data
public class UserSocialLogin {
	private Long userId;
	private String provider;
	private String providerId;
}
