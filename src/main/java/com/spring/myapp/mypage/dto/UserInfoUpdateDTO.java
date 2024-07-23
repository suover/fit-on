package com.spring.myapp.mypage.dto;

import java.util.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 기본 정보 업데이트를 위한 DTO 클래스입니다.
 */
@Getter
@Setter
public class UserInfoUpdateDTO {
	private int userId;

	@NotBlank(message = "Email is mandatory")
	@Email(message = "Email should be valid")
	private String email;

	@NotBlank(message = "Name is mandatory")
	@Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
	private String name;

	@NotBlank(message = "Nickname is mandatory")
	@Size(min = 1, max = 10, message = "Nickname must be between 1 and 10 characters")
	private String nickname;

	@NotBlank(message = "Phone number is mandatory")
	@Pattern(regexp = "^\\d{10,20}$", message = "Phone number should be between 10 and 20 digits")
	private String phone;

	private Date birthday;
}
