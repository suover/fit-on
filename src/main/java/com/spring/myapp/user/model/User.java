package com.spring.myapp.user.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
	private Long userId;

	@NotBlank(message = "Email is mandatory")
	@Email(message = "Email should be valid")
	private String email;

	@NotBlank(message = "Name is mandatory")
	@Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
	private String name;

	@NotBlank(message = "Password is mandatory")
	@Size(min = 8, message = "Password must be at least 8 characters")
	private String password;

	@NotBlank(message = "Nickname is mandatory")
	@Size(min = 1, max = 10, message = "Nickname must be between 1 and 10 characters")
	private String nickname;

	@NotBlank(message = "Phone number is mandatory")
	@Pattern(regexp = "^\\d{10,20}$", message = "Phone number should be between 10 and 20 digits")
	private String phone;

	private LocalDate birthDate;

	private boolean isActive = true;

	private LocalDateTime joinDate = LocalDateTime.now();
}
