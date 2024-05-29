package com.spring.myapp.informationBoard.controller;

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
import com.spring.myapp.informationBoard.service.InfoCommentsService;

@RequestMapping("api/info")
@RestController
public class InfoBoardCommentsController {

	private static final Logger logger = LoggerFactory.getLogger(InfoBoardCommentsController.class);

	@Autowired
	InfoCommentsService infoCommentsService;

	@GetMapping("/{infoId}/comments")
	public ResponseEntity<?> getAllInfoList(@PathVariable("infoId") Long infoId) {
		try {
			List<Comments> allComments = infoCommentsService.getAllComments(infoId);
			return new ResponseEntity<>(allComments, HttpStatus.OK);
		} catch (Exception e) {
			// Log the error and return a 500 status with a message
			logger.error("Error while fetching comments for infoId: " + infoId, e);
			return ResponseEntity.badRequest().body("Error while processing new comment post");
		}
	}

	@PostMapping("/{infoId}/newComments")
	public ResponseEntity<?> newInfoComment(@RequestBody Comments comment) { // 새 정보글 등록
		try {
			logger.info("Received new information post request: {}", comment);
			Comments savedComment = infoCommentsService.writeNewComment(comment);

			return ResponseEntity.ok(savedComment);

		} catch (Exception e) {
			logger.error("Error while processing new comment post", e);
			return ResponseEntity.badRequest().body("Error while processing new comment post");
		}
	}

	@GetMapping("/{infoId}/{commentId}")
	public ResponseEntity<List<Comments>> getAllReplies(@PathVariable("commentId") Long commentId) {
		List<Comments> allReplies = infoCommentsService.getAllReplies(commentId);
		return new ResponseEntity<>(allReplies, HttpStatus.OK);
	}

	@DeleteMapping("/{infoId}/{commentId}/delete")
	public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
		try {
			infoCommentsService.deleteComment(commentId);
			return ResponseEntity.ok("Comment deleted successfully");
		} catch (Exception e) {
			logger.error("Error while deleting comment", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting comment");
		}
	}

	@PutMapping("/{infoId}/{commentId}/update")
	public ResponseEntity<?> updateComment(@PathVariable("commentId") Long commentId,
		@RequestBody Comments updatedComment) {
		try {
			infoCommentsService.updateComment(commentId, updatedComment.getContent());
			return ResponseEntity.ok("Comment updated successfully");
		} catch (Exception e) {
			logger.error("Error while updating comment", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating comment");
		}
	}
}
