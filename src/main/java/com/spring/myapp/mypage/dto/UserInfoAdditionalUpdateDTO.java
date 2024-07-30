package com.spring.myapp.mypage.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 추가 정보 업데이트를 위한 DTO 클래스입니다.
 */
@Getter
@Setter
public class UserInfoAdditionalUpdateDTO {
	private int userId;
	private String gender;
	private String occupation;
	private int benchPress;
	private int squat;
	private int deadlift;
}
