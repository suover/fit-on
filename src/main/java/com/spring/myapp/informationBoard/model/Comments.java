package com.spring.myapp.informationBoard.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Comments {
	private Long commentId;

	private Long infoId;

	private Long userId;

	@NotBlank(message = "Content is mandatory")
	private String content;

	private Long parentCommentId;

	private LocalDateTime createdAt = LocalDateTime.now();

	private LocalDateTime updatedAt;

	private Boolean isDeleted;

	private String nickname;

}
