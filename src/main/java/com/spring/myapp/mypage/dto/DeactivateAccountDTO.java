package com.spring.myapp.mypage.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * 계정 비활성화 요청을 위한 DTO 클래스입니다.
 */
@Getter
@Setter
public class DeactivateAccountDTO {

	@NotNull(message = "User ID cannot be null")
	private Integer userId;
}
