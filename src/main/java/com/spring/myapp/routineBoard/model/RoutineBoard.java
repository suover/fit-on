package com.spring.myapp.routineBoard.model;

import java.sql.Timestamp;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoutineBoard {

	private Long routineId;
	private Long userId;
	private String title;
	private String content;
	private Timestamp createdAt;
	private Timestamp updatedAt;
	private Long viewCount = 0L;  // 초기값 설정
	private Long shareCount = 0L;  // 초기값 설정
	private boolean isDeleted;
	private boolean isPublic;
	private int goalId;
	private int levelId;
	private int partId;
	private List<String> routineItems;
}
