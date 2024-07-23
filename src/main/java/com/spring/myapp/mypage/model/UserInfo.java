package com.spring.myapp.mypage.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 정보를 나타내는 모델 클래스입니다.
 */
@Getter
@Setter
public class UserInfo {
	private int userId;
	private String password;
	private String email;
	private String name;
	private String nickname;
	private String phone;
	private Date birthday;
	private Date joinDate;
	private String gender;
	private String occupation;
	private int benchPress;
	private int squat;
	private int deadlift;
}
