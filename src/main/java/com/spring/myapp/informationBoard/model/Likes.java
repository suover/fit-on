package com.spring.myapp.informationBoard.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Likes {
	private Integer infoId;
	private Integer userId;
	private LocalDateTime createdAt;
}
