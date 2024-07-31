package com.spring.myapp.mypage.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * PostManagementDto는 게시글 관리를 위한 데이터 전송 객체입니다.
 */
@Getter
@Setter
public class PostManagementDto {
	private String id;
	private String title;
	private int views;
	private int comments;
	private String date;
}
