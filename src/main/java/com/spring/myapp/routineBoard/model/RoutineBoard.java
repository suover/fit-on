package com.spring.myapp.routineBoard.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoutineBoard {

	private Long routineId;
	private Long userId;
	private String nickname;
	private String title;
	private String content;
	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime updatedAt;
	private int viewCount = 0;
	private int shareCount = 0;
	private boolean isDeleted = false;
	private boolean isPublic = true;
	private Integer goalId;
	private Integer levelId;
	private Integer partId;
	private String imageUrl;
}
