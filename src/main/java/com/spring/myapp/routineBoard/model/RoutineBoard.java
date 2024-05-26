package com.spring.myapp.routineBoard.model;

import java.time.LocalDateTime;
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
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
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
