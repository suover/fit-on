package com.spring.myapp.routineBoard.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import com.spring.myapp.routineBoard.service.RoutineLikesService;
import com.spring.myapp.routineBoard.service.RoutineS3Service;

@RestController
@RequestMapping("/api/routine")
public class RoutineBoardController {

	@Autowired
	private RoutineS3Service s3Service;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private RoutineBoardService routineBoardService;

	@Autowired
	private RoutineLikesService routineLikesService;

	@GetMapping("/list")
	public ResponseEntity<Page<RoutineBoard>> getRoutinesWithPaging(
		@RequestParam(value = "page", defaultValue = "0") int page,
		@RequestParam(value = "size", defaultValue = "12") int size,
		@RequestParam(value = "query", required = false) String query) {
		Pageable pageable = PageRequest.of(page, size);
		Page<RoutineBoard> routines;
		if (query != null && !query.isEmpty()) {
			routines = routineBoardService.getRoutinesWithPagingAndSearch(query, pageable);
		} else {
			routines = routineBoardService.getRoutinesWithPaging(pageable);
		}
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

	//게시글 생성
	@PostMapping("/new-routine")
	public ResponseEntity<RoutineBoard> createRoutine(
		@RequestPart("file") MultipartFile file,
		@RequestParam("title") String title,
		@RequestParam("content") String content,
		@RequestParam("goalId") Integer goalId,
		@RequestParam("levelId") Integer levelId,
		@RequestParam("partId") Integer partId,
		@RequestParam("isPublic") boolean isPublic,
		@RequestParam("userId") Long userId,
		@RequestParam("nickname") String nickname) {
		try {

			String imageUrl = saveImage(file);
			RoutineBoard routineBoard = new RoutineBoard();
			routineBoard.setTitle(title);
			routineBoard.setContent(content);
			routineBoard.setGoalId(goalId);
			routineBoard.setLevelId(levelId);
			routineBoard.setPartId(partId);
			routineBoard.setPublic(isPublic);
			routineBoard.setUserId(userId);
			routineBoard.setNickname(nickname);
			routineBoard.setImageUrl(imageUrl);

			RoutineBoard savedRoutine = routineBoardService.createRoutineBoard(routineBoard, userId, nickname);
			return ResponseEntity.ok(savedRoutine);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	private String saveImage(MultipartFile file) throws IOException {
		String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		s3Service.uploadFile("routines", filename, file);
		return s3Service.getFileUrl("routines", filename);
	}

	//게시글 조회
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
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	//게시글 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteRoutine(@PathVariable("id") Long id, @RequestParam("userId") Long userId) {
		try {
			RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
			if (routineBoard == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}

			if (!routineBoard.getUserId().equals(userId)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}

			boolean isDeleted = routineBoardService.deleteRoutineById(id);
			if (isDeleted) {
				return ResponseEntity.noContent().build();
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//게시글 수정
	@PutMapping("/{id}")
	public ResponseEntity<RoutineBoard> updateRoutine(@PathVariable("id") Long id,
		@RequestPart(value = "file", required = false) MultipartFile file,
		@RequestParam("title") String title,
		@RequestParam("content") String content,
		@RequestParam("goalId") Integer goalId,
		@RequestParam("levelId") Integer levelId,
		@RequestParam("partId") Integer partId,
		@RequestParam("isPublic") boolean isPublic,
		@RequestParam("nickname") String nickname,
		@RequestParam("userId") Long userId) {
		try {
			RoutineBoard routineBoard = routineBoardService.getRoutineById(id);
			if (routineBoard == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			if (!routineBoard.getUserId().equals(userId)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
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
			routineBoard.setNickname(nickname);

			RoutineBoard updatedRoutine = routineBoardService.updateRoutine(id, routineBoard);
			return ResponseEntity.ok(updatedRoutine);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	//게시글 조회수 + 1
	@PutMapping("/increment-view/{id}")
	public ResponseEntity<Void> incrementViewCount(@PathVariable("id") Long id) {
		try {
			routineBoardService.incrementViewCount(id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//베스트 루틴
	@GetMapping("/best")
	public ResponseEntity<List<RoutineBoard>> getBestRoutines(
		@RequestParam(value = "limit", defaultValue = "10") int limit) {
		try {
			List<RoutineBoard> bestRoutines = routineBoardService.getBestRoutines(limit);

			// 좋아요 수 포함
			bestRoutines.forEach(routine -> {
				int likes = routineLikesService.getLikesCount(routine.getRoutineId());
				routine.setLikes(likes);
			});
			return ResponseEntity.ok(bestRoutines);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/{id}/like")
	public ResponseEntity<Integer> likeRoutine(@PathVariable("id") Long routineId,
		@RequestParam("userId") Long userId) {
		try {
			if (!routineLikesService.isLiked(routineId, userId)) {
				routineLikesService.likeRoutine(routineId, userId);
				int likesCount = routineLikesService.getLikesCount(routineId);
				return ResponseEntity.ok(likesCount);
			} else {
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/{id}/unlike")
	public ResponseEntity<Integer> unlikeRoutine(@PathVariable("id") Long routineId,
		@RequestParam("userId") Long userId) {
		try {
			if (routineLikesService.isLiked(routineId, userId)) {
				routineLikesService.unlikeRoutine(routineId, userId);
				int likesCount = routineLikesService.getLikesCount(routineId);
				return ResponseEntity.ok(likesCount);
			} else {
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{id}/likes")
	public ResponseEntity<Map<String, Object>> getLikesCount(@PathVariable("id") Long routineId,
		@RequestParam(value = "userId", required = false) Long userId) {
		try {
			int count = routineLikesService.getLikesCount(routineId);
			boolean liked = (userId != null) && routineLikesService.isLiked(routineId, userId);
			Map<String, Object> response = new HashMap<>();
			response.put("count", count);
			response.put("liked", liked);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
