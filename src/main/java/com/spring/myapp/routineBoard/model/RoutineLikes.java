package com.spring.myapp.routineBoard.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class RoutineLikes {
	private Long routineId;
	private Long userId;
	private LocalDateTime createdAt;
}
