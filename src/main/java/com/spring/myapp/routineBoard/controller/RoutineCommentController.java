package com.spring.myapp.routineBoard.controller;

import java.util.ArrayList;
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
			logger.info("Fetched comments: {}", allComments);
			System.out.println("---------------------------------------------------------");
			System.out.println("Fetched comments: " + allComments);
			System.out.println("---------------------------------------------------------");
			return new ResponseEntity<>(allComments, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error fetching comments for routineNo: {}", routineNo, e);
			System.out.println("---------------------------------------------------------");
			System.out.println("Error fetching comments for routineNo: " + routineNo);
			System.out.println("---------------------------------------------------------");
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
			logger.info("Received new comment post request for routineNo: {}, comment: {}", routineNo, comment);
			System.out.println("---------------------------------------------------------");
			System.out.println(
				"Received new comment post request for routineNo: " + routineNo + ", comment: " + comment);
			System.out.println("---------------------------------------------------------");
			RoutineComments newComment = routineCommentsService.writeNewComment(comment);
			return ResponseEntity.ok(newComment);
		} catch (Exception e) {
			logger.error("Error while creating new comment for routineNo: {}", routineNo, e);
			System.out.println("---------------------------------------------------------");
			System.out.println("Error while creating new comment for routineNo: " + routineNo);
			System.out.println("---------------------------------------------------------");
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// 특정 댓글 조회
	@GetMapping("/{commentId}")
	public ResponseEntity<RoutineComments> getCommentById(@PathVariable("commentId") Long commentId) {
		try {
			RoutineComments comment = routineCommentsService.getCommentById(commentId);
			return new ResponseEntity<>(comment, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error fetching comment by id: {}", commentId, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// 특정 댓글의 답글 조회
	@GetMapping("/{commentId}/replies")
	public ResponseEntity<List<RoutineComments>> getRepliesById(
		@PathVariable("commentId") Long commentId) {
		try {
			List<RoutineComments> replies = routineCommentsService.getRepliesById(commentId);
			return new ResponseEntity<>(replies, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error fetching replies for commentId: {}", commentId, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>()); // 에러 시에도 빈 배열 반환
		}
	}

	// 댓글 삭제
	@DeleteMapping("/{commentId}/delete")
	public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
		try {
			routineCommentsService.deleteComment(commentId);
			logger.info("Deleted comment with id: {}", commentId);
			System.out.println("---------------------------------------------------------");
			System.out.println("Deleted comment with id: " + commentId);
			System.out.println("---------------------------------------------------------");
			return ResponseEntity.ok("Comment deleted successfully");
		} catch (Exception e) {
			logger.error("Error while deleting comment id: {}", commentId, e);
			System.out.println("---------------------------------------------------------");
			System.out.println("Error while deleting comment id: " + commentId);
			System.out.println("---------------------------------------------------------");
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
			logger.error("Error while updating comment id: {}, routineNo: {}", commentId, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
