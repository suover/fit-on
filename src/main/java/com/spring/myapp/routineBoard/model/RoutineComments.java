package com.spring.myapp.routineBoard.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoutineComments {
	private Long commentId;
	private Long routineId;
	private Long userId;
	@NotBlank(message = "Content is mandatory!!")
	private String content;
	private Long parentCommentId;
	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime updatedAt;
	private Boolean isDeleted = false;
	private String nickname;
}
