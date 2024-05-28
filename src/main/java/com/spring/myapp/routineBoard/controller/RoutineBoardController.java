package com.spring.myapp.routineBoard.controller;

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

	@GetMapping("/{id}")
	public ResponseEntity<RoutineBoard> getRoutineById(@PathVariable Long id) {
		logger.info("@@@@@@@@@@@Fetching routine with id: {}", id);
		RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
		if (routineBoard != null) {
			logger.debug("@@@@@@@@@@@Found routine: {}", routineBoard);
			return ResponseEntity.ok(routineBoard);
		} else {
			logger.warn("@@@@@@@@@@@Routine with id {} not found", id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping("/new-routine")
	public ResponseEntity<RoutineBoard> createRoutine(@RequestBody RoutineBoard routineBoard) {
		logger.info("@@@@@@@@@@@Creating new routine with title: {}", routineBoard.getTitle());
		String goalName = routineBoardService.getGoalNameById(routineBoard.getGoalId());
		String levelName = routineBoardService.getLevelNameById(routineBoard.getLevelId());
		String partName = routineBoardService.getPartNameById(routineBoard.getPartId());
		logger.debug("@@@@@@@@@@@Routine Details: Title={}, GoalName={}, LevelName={}, PartName={}",
			routineBoard.getTitle(),
			goalName, levelName, partName);
		RoutineBoard savedRoutine = routineBoardService.createRoutineBoard(routineBoard);
		logger.debug("@@@@@@@@@@@Created routine: {}", savedRoutine);
		return ResponseEntity.ok(savedRoutine);
	}
}
