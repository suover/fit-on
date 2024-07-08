package com.spring.myapp.routineBoard.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.service.RoutineBoardService;
import com.spring.myapp.routineBoard.service.RoutineS3Service;

@RestController
@RequestMapping("/api/routine")
public class RoutineBoardController {

	@Autowired
	private RoutineS3Service s3Service;

	@Autowired
	private ObjectMapper objectMapper;

	private static final Logger logger = LoggerFactory.getLogger(RoutineBoardController.class);

	@Autowired
	private RoutineBoardService routineBoardService;

	@GetMapping
	public ResponseEntity<List<RoutineBoard>> getAllRoutines(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "12") int size) {
		try {
			int offset = page * size;
			List<RoutineBoard> routines = routineBoardService.getRoutinesWithPaging(offset, size);
			return ResponseEntity.ok(routines);
		} catch (Exception e) {
			logger.error("@@@@@@@@@Error getting all routines@@@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<RoutineBoard> getRoutineById(@PathVariable("id") Long id) {
		try {
			routineBoardService.incrementViewCount(id);
			RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
			if (routineBoard != null) {
				return ResponseEntity.ok(routineBoard);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
		} catch (Exception e) {
			logger.error("@@@@@@@@@@Error getting routine by ID@@@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRoutine(@PathVariable("id") Long id) {
		try {
			boolean isDeleted = routineBoardService.deleteRoutineById(id);
			if (isDeleted) {
				return ResponseEntity.noContent().build();
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			logger.error("@@@@@@@@Error deleting routine@@@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<RoutineBoard> updateRoutine(@PathVariable("id") Long id,
		@RequestPart(value = "file", required = false) MultipartFile file,
		@RequestParam("title") String title,
		@RequestParam("content") String content,
		@RequestParam("goalId") Integer goalId,
		@RequestParam("levelId") Integer levelId,
		@RequestParam("partId") Integer partId,
		@RequestParam("isPublic") boolean isPublic) {
		try {
			RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
			if (routineBoard == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			if (file != null && !file.isEmpty()) {
				String imageUrl = saveImage(file);
				routineBoard.setImageUrl(imageUrl);
			}

			routineBoard.setTitle(title);
			routineBoard.setContent(content);
			routineBoard.setGoalId(goalId);
			routineBoard.setLevelId(levelId);
			routineBoard.setPartId(partId);
			routineBoard.setPublic(isPublic);

			RoutineBoard updatedRoutine = routineBoardService.updateRoutine(id, routineBoard);
			return ResponseEntity.ok(updatedRoutine);
		} catch (IOException e) {
			logger.error("@@@@@@@@Error uploading image@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		} catch (Exception e) {
			logger.error("@@@@@@Error updating routine@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/new-routine")
	public ResponseEntity<RoutineBoard> createRoutine(
		@RequestPart("file") MultipartFile file,
		@RequestParam("title") String title,
		@RequestParam("content") String content,
		@RequestParam("goalId") Integer goalId,
		@RequestParam("levelId") Integer levelId,
		@RequestParam("partId") Integer partId,
		@RequestParam("isPublic") boolean isPublic) {
		try {
			String imageUrl = saveImage(file);
			RoutineBoard routineBoard = new RoutineBoard();
			routineBoard.setTitle(title);
			routineBoard.setContent(content);
			routineBoard.setGoalId(goalId);
			routineBoard.setLevelId(levelId);
			routineBoard.setPartId(partId);
			routineBoard.setPublic(isPublic);
			routineBoard.setImageUrl(imageUrl);

			RoutineBoard savedRoutine = routineBoardService.createRoutineBoard(routineBoard);
			return ResponseEntity.ok(savedRoutine);
		} catch (IOException e) {
			logger.error("@@@@@@@@Error uploading image@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		} catch (Exception e) {
			logger.error("@@@@@@Error creating routine@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	private String saveImage(MultipartFile file) throws IOException {
		String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		s3Service.uploadFile("routines", filename, file);
		return s3Service.getFileUrl("routines", filename);
	}

	@PutMapping("/increment-view/{id}")
	public ResponseEntity<Void> incrementViewCount(@PathVariable("id") Long id) {
		try {
			routineBoardService.incrementViewCount(id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			logger.error("@@@@@@@Error incrementing view count@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/list")
	public ResponseEntity<List<RoutineBoard>> getRoutinesWithPaging(
		@RequestParam("page") int page, @RequestParam("size") int size,
		@RequestParam(value = "query", required = false) String query) {
		try {
			int offset = page * size;
			List<RoutineBoard> routines;
			if (query != null && !query.isEmpty()) {
				routines = routineBoardService.getRoutinesWithPagingAndSearch(offset, size, query);
			} else {
				routines = routineBoardService.getRoutinesWithPaging(offset, size);
			}
			return ResponseEntity.ok(routines);
		} catch (Exception e) {
			logger.error("@@@@@@@@Error getting routines with paging@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/count")
	public ResponseEntity<Long> getRoutineCount(@RequestParam(value = "query", required = false) String query) {
		try {
			long count;
			if (query != null && !query.isEmpty()) {
				count = routineBoardService.getRoutineCountWithSearch(query);
			} else {
				count = routineBoardService.getRoutineCount();
			}
			return ResponseEntity.ok(count);
		} catch (Exception e) {
			logger.error("@@@@@@@@Error getting routine count@@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/best")
	public ResponseEntity<List<RoutineBoard>> getBestRoutines() {
		try {
			List<RoutineBoard> bestRoutines = routineBoardService.getBestRoutines();
			return ResponseEntity.ok(bestRoutines);
		} catch (Exception e) {
			logger.error("@@@@@@Error getting best routines@@@@@@@@@@", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
