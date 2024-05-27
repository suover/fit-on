package com.spring.myapp.informationBoard.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Comments {
	private Integer commentId;
	private Integer infoId;
	private Integer userId;
	@NotBlank(message = "Content is mandatory")
	private String content;
	private Integer parentCommentId;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Boolean isDeleted;
}
