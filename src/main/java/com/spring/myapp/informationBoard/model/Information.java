package com.spring.myapp.informationBoard.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class Information {
	private Long infoId;

	private Integer userId;

	private Integer categoryId;

	@NotBlank(message = "Title is mandatory")
	@Size(min = 5, max = 255, message = "Title must be between 5 and 255 characters")
	private String title;

	@NotBlank(message = "Content is mandatory")
	private String content;

	private String imageUrl;

	private LocalDateTime createdAt = LocalDateTime.now();

	private LocalDateTime updatedAt;

	private Integer viewCount;

	private Boolean isDeleted = false;

	private String categoryName;

	private String nickname;
}
