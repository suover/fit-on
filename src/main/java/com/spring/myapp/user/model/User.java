package com.spring.myapp.user.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 정보를 나타내는 클래스.
 * 사용자 ID, 이메일, 이름, 비밀번호, 닉네임, 전화번호, 생년월일, 활성 상태 및 가입 날짜를 포함합니다.
 */
@Getter
@Setter
public class User {
	/** 사용자 ID */
	private Long userId;

	/** 사용자 이메일 */
	@NotBlank(message = "Email is mandatory")
	@Email(message = "Email should be valid")
	private String email;

	/** 사용자 이름 */
	@NotBlank(message = "Name is mandatory")
	@Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
	private String name;

	/** 사용자 비밀번호 */
	@NotBlank(message = "Password is mandatory")
	@Size(min = 8, message = "Password must be at least 8 characters")
	private String password;

	/** 사용자 닉네임 */
	@NotBlank(message = "Nickname is mandatory")
	@Size(min = 1, max = 10, message = "Nickname must be between 1 and 10 characters")
	private String nickname;

	/** 사용자 핸드폰번호 */
	@NotBlank(message = "Phone number is mandatory")
	@Pattern(regexp = "^\\d{10,20}$", message = "Phone number should be between 10 and 20 digits")
	private String phone;

	/** 사용자 생년월일 */
	private LocalDate birthDate;

	/** 사용자 활성 상태 */
	private boolean isActive = true;

	/** 사용자 가입 날짜 */
	private LocalDateTime joinDate = LocalDateTime.now();
}
