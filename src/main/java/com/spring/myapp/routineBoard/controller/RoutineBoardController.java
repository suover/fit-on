package com.spring.myapp.routineBoard.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.service.RoutineBoardService;

@RestController
@RequestMapping("/api/routine")
public class RoutineBoardController {

	private static final Logger logger = LoggerFactory.getLogger(RoutineBoardController.class);
	private static final String UPLOAD_DIR = "/Users/baegseungmin/Desktop/images/";

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

	@GetMapping
	public ResponseEntity<List<RoutineBoard>> getAllRoutines() {
		List<RoutineBoard> routines = routineBoardService.getAllRoutines();
		return ResponseEntity.ok(routines);
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

	@PostMapping("/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
		}

		try {
			// Create directory if it doesn't exist
			File uploadDir = new File(UPLOAD_DIR);
			if (!uploadDir.exists()) {
				uploadDir.mkdirs();
			}

			// Save the file
			byte[] bytes = file.getBytes();
			Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
			Files.write(path, bytes);

			// Generate file URL
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/api/routine/upload/")
				.path(file.getOriginalFilename())
				.toUriString();

			return ResponseEntity.ok(fileDownloadUri);
		} catch (IOException e) {
			logger.error("Error uploading file", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
		}
	}

	@GetMapping("/uploads/{filename:.+}")
	@ResponseBody
	public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
		try {
			Path path = Paths.get(UPLOAD_DIR + filename);
			byte[] image = Files.readAllBytes(path);
			return ResponseEntity.ok().body(image);
		} catch (IOException e) {
			logger.error("Error reading file", e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
}
