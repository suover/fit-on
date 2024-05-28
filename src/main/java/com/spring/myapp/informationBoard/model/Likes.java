package com.spring.myapp.informationBoard.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Likes {
	private Long infoId;
	private Long userId;
	private LocalDateTime createdAt;
}
