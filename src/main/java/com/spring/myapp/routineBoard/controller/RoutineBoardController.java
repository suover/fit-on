package com.spring.myapp.routineBoard.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.service.RoutineBoardService;

@RestController
@RequestMapping("/api/routine")
public class RoutineBoardController {

	private static final Logger logger = LoggerFactory.getLogger(RoutineBoardController.class);

	@Autowired
	private RoutineBoardService routineBoardService;

	@GetMapping
	public ResponseEntity<List<RoutineBoard>> getAllRoutines() {
		// 모든 루틴을 가져오는 요청 처리
		List<RoutineBoard> routines = routineBoardService.getAllRoutines();
		return ResponseEntity.ok(routines);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RoutineBoard> getRoutineById(@PathVariable Long id) {
		// ID로 루틴을 가져오는 요청 처리
		RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
		if (routineBoard != null) {
			return ResponseEntity.ok(routineBoard);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping("/new-routine")
	public ResponseEntity<RoutineBoard> createRoutine(@RequestBody RoutineBoard routineBoard) {
		// 새로운 루틴을 생성하는 요청 처리
		RoutineBoard savedRoutine = routineBoardService.createRoutineBoard(routineBoard);
		return ResponseEntity.ok(savedRoutine);
	}
}
