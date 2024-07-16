package com.spring.myapp.user.model;

import lombok.Data;

/**
 * 소셜 로그인 사용자 정보를 나타내는 클래스.
 * 사용자 ID, 소셜 로그인 제공자 및 제공자 ID를 포함합니다.
 */
@Data
public class UserSocialLogin {
	/** 사용자 ID */
	private Long userId;

	/** 소셜 로그인 제공자 */
	private String provider;

	/** 소셜 로그인 제공자 ID */
	private String providerId;
}
