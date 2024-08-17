package com.spring.myapp.routineBoard.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoutineShare {
	private Long shareId;
	private Long routineId;
	private Long userId;
	private LocalDateTime sharedAt;
}

