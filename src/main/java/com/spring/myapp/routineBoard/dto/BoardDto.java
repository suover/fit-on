package com.spring.myapp.routineBoard.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//테이블 필드 정의.

@Getter
@Setter
@ToString
public class BoardDto {

	private Long routineId;
	private Long userId;
	private String title;
	private String content;
	private Date createdAt;
	private Date updatedAt;
	private int viewCount;
	private int shareCount;
	private boolean isDeleted;
	private boolean isPublic;
	private Long goalId;
	private Long levelId;
	private Long partId;
	private List<String> routineItems;
	private String imageUrl;
}