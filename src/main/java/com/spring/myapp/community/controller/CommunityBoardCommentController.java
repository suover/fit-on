package com.spring.myapp.community.controller;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.community.model.CommunityBoardComments;
import com.spring.myapp.community.service.CommunityBoardCommentService;

@RequestMapping("api/community")
@RestController
public class CommunityBoardCommentController {

		private static final Logger logger = LoggerFactory.getLogger(CommunityBoardCommentController.class);

		@Autowired
		CommunityBoardCommentService communityBoardCommentService;

		// 댓글 목록 불러오기:
		@GetMapping("/{communityId}/comments")
		public ResponseEntity<?> getAllList(@PathVariable("communityId") Long communityId) {
				try {
						List<CommunityBoardComments> allComments = communityBoardCommentService.getAllComments(communityId);
						return new ResponseEntity<>(allComments, HttpStatus.OK);
				} catch (Exception e) {
						// Log the error and return a 500 status with a message
						logger.error("Error while fetching comments for communityId: " + communityId, e);
						return ResponseEntity.badRequest().body("Error while processing new comment post");
				}
		}

		//새로운 댓글 추가:
		@PostMapping("/{communityId}/newComments")
		public ResponseEntity<?> newCommunityComment(@RequestBody CommunityBoardComments comment) {
				try {
						logger.info("Received new communityboard content post request: {}", comment);
						CommunityBoardComments savedComment = communityBoardCommentService.writeNewComment(comment);

						return ResponseEntity.ok(savedComment);

				} catch (Exception e) {
						logger.error("Error while processing new comment post", e);
						return ResponseEntity.badRequest().body("Error while processing new comment post");
				}
		}


		// 특정 댓글의 모든 답글 불러오기
		@GetMapping("/{communityId}/{commentId}")
		public ResponseEntity<List<CommunityBoardComments>> getAllReplies(@PathVariable("commentId") Long commentId) {
				List<CommunityBoardComments> allReplies = communityBoardCommentService.getAllReplies(commentId);
				return new ResponseEntity<>(allReplies, HttpStatus.OK);
		}

		// 댓글 삭제
		@PutMapping("/{communityId}/{commentId}/delete")
		public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
				try {
						communityBoardCommentService.deleteComment(commentId);
						return ResponseEntity.ok("Comment deleted successfully");
				} catch (Exception e) {
						logger.error("Error while deleting comment", e);
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting comment");
				}
		}

		//댓글 수정
		@PutMapping("/{communityId}/{commentId}/update")
		public ResponseEntity<?> updateComment(@PathVariable("commentId") Long commentId,
				@RequestBody CommunityBoardComments updatedComment) {
				try {
						communityBoardCommentService.updateComment(commentId, updatedComment.getContent());
						return ResponseEntity.ok("Comment updated successfully");
				} catch (Exception e) {
						logger.error("Error while updating comment", e);
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating comment");
				}
		}

}
