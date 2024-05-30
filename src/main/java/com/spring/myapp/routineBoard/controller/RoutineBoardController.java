package com.spring.myapp.routineBoard.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<List<RoutineBoard>> getAllRoutines(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "12") int size) {
		int offset = page * size;
		List<RoutineBoard> routines = routineBoardService.getRoutinesWithPaging(offset, size);
		return ResponseEntity.ok(routines);
	}

	//게시글 조회
	@GetMapping("/{id}")
	public ResponseEntity<RoutineBoard> getRoutineById(@PathVariable("id") Long id) {
		routineBoardService.incrementViewCount(id); // 조회수 증가
		RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
		if (routineBoard != null) {
			return ResponseEntity.ok(routineBoard);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	//게시글 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRoutine(@PathVariable("id") Long id) {
		boolean isDeleted = routineBoardService.deleteRoutineById(id);
		if (isDeleted) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	//게시글 수정
	@PutMapping("/{id}")
	public ResponseEntity<RoutineBoard> updateRoutine(@PathVariable("id") Long id,
		@RequestBody RoutineBoard routineBoard) {
		RoutineBoard updatedRoutine = routineBoardService.updateRoutine(id, routineBoard);
		if (updatedRoutine != null) {
			return ResponseEntity.ok(updatedRoutine);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	//게시글 생성
	@PostMapping("/new-routine")
	public ResponseEntity<RoutineBoard> createRoutine(@RequestBody RoutineBoard routineBoard) {
		String goalName = routineBoardService.getGoalNameById(routineBoard.getGoalId());
		String levelName = routineBoardService.getLevelNameById(routineBoard.getLevelId());
		String partName = routineBoardService.getPartNameById(routineBoard.getPartId());
		RoutineBoard savedRoutine = routineBoardService.createRoutineBoard(routineBoard);
		return ResponseEntity.ok(savedRoutine);
	}

	//조회수
	@PutMapping("/increment-view/{id}")
	public ResponseEntity<Void> incrementViewCount(@PathVariable("id") Long id) {
		routineBoardService.incrementViewCount(id);
		return ResponseEntity.ok().build();
	}

	// 페이징
	@GetMapping("/list")
	public ResponseEntity<List<RoutineBoard>> getRoutinesWithPaging(
		@RequestParam("page") int page, @RequestParam("size") int size,
		@RequestParam(value = "query", required = false) String query) {
		logger.debug("Fetching routines with page: {} and size: {}", page, size); // 수정된 로그
		List<RoutineBoard> routines = routineBoardService.getRoutines(page, size, query);
		return ResponseEntity.ok(routines);
	}

	@GetMapping("/count")
	public ResponseEntity<Long> getRoutineCount(@RequestParam(value = "query", required = false) String query) {
		long count;
		if (query != null && !query.isEmpty()) {
			count = routineBoardService.getRoutineCountWithSearch(query);
		} else {
			count = routineBoardService.getRoutineCount();
		}
		return ResponseEntity.ok(count);
	}

	// 베스트 루틴 조회
	@GetMapping("/best")
	public ResponseEntity<List<RoutineBoard>> getBestRoutines() {
		List<RoutineBoard> bestRoutines = routineBoardService.getBestRoutines();
		return ResponseEntity.ok(bestRoutines);
	}
}
