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
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.informationBoard.model.Comments;
import com.spring.myapp.routineBoard.model.RoutineComments;
import com.spring.myapp.routineBoard.service.RoutineCommentsService;

@RestController
@RequestMapping("/api/routine/{routineNo}")
public class RoutineCommentController {

	private static final Logger logger = LoggerFactory.getLogger(RoutineCommentController.class);

	@Autowired
	private RoutineCommentsService routineCommentsService;

	// 모든 댓글 조회
	@GetMapping("/comments")
	public ResponseEntity<List<RoutineComments>> getAllComments(@PathVariable("routineNo") Long routineNo) {
		try {
			List<RoutineComments> allComments = routineCommentsService.getAllComments(routineNo);
			return new ResponseEntity<>(allComments, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// 새로운 댓글 작성
	@PostMapping("/newComments")
	public ResponseEntity<RoutineComments> writeNewComment(@PathVariable("routineNo") Long routineNo,
		@RequestBody RoutineComments comment) {
		try {
			comment.setRoutineId(routineNo);
			comment.setIsDeleted(false); // 기본값 설정
			RoutineComments newComment = routineCommentsService.writeNewComment(comment);
			return ResponseEntity.ok(newComment);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/{commentId}")
	public ResponseEntity<List<RoutineComments>> getAllReplies(@PathVariable("commentId") Long commentId) {
		List<RoutineComments> allReplies = routineCommentsService.getAllRoutineReplies(commentId);
		return new ResponseEntity<>(allReplies, HttpStatus.OK);
	}

	// 댓글 삭제
	@DeleteMapping("/{commentId}/delete")
	public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
		try {
			routineCommentsService.deleteComment(commentId);
			logger.info("Deleted comment with id: {}", commentId);
			return ResponseEntity.ok("Comment deleted successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting comment");
		}
	}

	// 댓글 수정
	@PutMapping("/{commentId}/update")
	public ResponseEntity<?> updateComment(@PathVariable("commentId") Long commentId,
		@RequestBody Comments updatedComment) {
		try {
			routineCommentsService.updateComment(commentId, updatedComment.getContent());
			return ResponseEntity.ok("Comment updated successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
