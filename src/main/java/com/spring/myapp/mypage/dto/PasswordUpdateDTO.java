package com.spring.myapp.mypage.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * 비밀번호 업데이트를 위한 DTO 클래스입니다.
 */
@Getter
@Setter
public class PasswordUpdateDTO {

	private int userId;

	@NotBlank(message = "New password is mandatory")
	private String newPassword;
}
