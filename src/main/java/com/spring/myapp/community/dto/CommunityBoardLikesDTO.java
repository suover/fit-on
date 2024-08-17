package com.spring.myapp.community.dto;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class CommunityBoardLikesDTO {
		private Long id;

		private Long userId;

		private LocalDateTime createdAt;
}
