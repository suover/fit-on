package com.spring.myapp.user.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * 로그인 요청 데이터를 나타내는 클래스.
 * 사용자 이메일과 비밀번호를 포함합니다.
 */
@Getter
@Setter
public class LoginRequest {

	/** 사용자 이메일 */
	@NotBlank(message = "Email is mandatory")
	@Email(message = "Email should be valid")
	private String email;

	/** 사용자 비밀번호 */
	@NotBlank(message = "Password is mandatory")
	private String password;
}
