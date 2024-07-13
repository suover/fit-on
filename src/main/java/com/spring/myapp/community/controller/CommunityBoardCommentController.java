package com.spring.myapp.community.controller;
//
// import java.util.List;
//
// import org.springframework.http.ResponseEntity;
// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
//
// import com.spring.myapp.community.dto.CommunityBoardCommentDTO;
// import com.spring.myapp.community.service.CommunityBoardCommentService;
//
// import lombok.RequiredArgsConstructor;
//
// @RestController
// @RequestMapping("/api/community")
// @RequiredArgsConstructor
// public class CommunityBoardCommentController {
// 		private final CommunityBoardCommentService communityBoardCommentService;
//
// 		//댓글 작성
// 		@PostMapping("/posts/{communityId}/newComments")
// 		public ResponseEntity<CommunityBoardCommentDTO> addComment(
// 				  @PathVariable("communityId") Long communityId,
// 				  @RequestBody CommunityBoardCommentDTO communityBoardCommentDTO) {
// 				System.out.println("##### Add comment request received for communityId: " + communityId); // 로그 추가
// 				communityBoardCommentDTO.setCommunityId(communityId);
// 				CommunityBoardCommentDTO savedComment = communityBoardCommentService.save(communityBoardCommentDTO);
// 				return ResponseEntity.ok(savedComment);
// 		}
//
// 		//특정 게시글의 모든 댓글 가져오기
// 		@GetMapping("/posts/{communityId}/comments")
// 		public ResponseEntity<List<CommunityBoardCommentDTO>> getAllCommentsForPost(
// 					@PathVariable("communityId") Long communityId) {
// 				List<CommunityBoardCommentDTO> comments = communityBoardCommentService.findAllByCommunityId(communityId);
// 				return ResponseEntity.ok(comments);
// 		}
//
// 		//댓글 업데이트
// 		@PutMapping("/comments/{commentId}")
// 		public ResponseEntity<CommunityBoardCommentDTO> updateComment(
// 					@PathVariable("commentId") Long commentId,
// 					@RequestBody CommunityBoardCommentDTO communityBoardCommentDTO) {
// 				communityBoardCommentDTO.setCommentId(commentId);
// 				CommunityBoardCommentDTO updatedComment = communityBoardCommentService.update(communityBoardCommentDTO);
// 				// 업데이트된 댓글을 다시 조회하여 반환
// 				CommunityBoardCommentDTO fullUpdatedComment = communityBoardCommentService.findById(commentId);
// 				return ResponseEntity.ok(updatedComment);
// 		}
//
// 		//댓글 삭제
// 		@DeleteMapping("/comments/{commentId}")
// 		public ResponseEntity<Void> deleteComment(
// 					@PathVariable("commentId") Long commentId) {
// 				// communityBoardCommentService.delete(commentId);
// 				communityBoardCommentService.softDelete(commentId); // softDelete 메서드 호출
// 				return ResponseEntity.ok().build();
// 		}
//
// 		//특정 댓글의 모든 답글 가져오기
// 		@GetMapping("/posts/{communityId}/comments/{commentId}/replies")
// 		public ResponseEntity<List<CommunityBoardCommentDTO>> getRepliesForComment(
// 				@PathVariable("communityId") Long communityId,
// 				@PathVariable("commentId") Long commentId) {
// 				if (commentId == null) {
// 						return ResponseEntity.badRequest().build();
// 				}
// 				List<CommunityBoardCommentDTO> replies = communityBoardCommentService.findRepliesByCommentId(commentId);
// 				return ResponseEntity.ok(replies);
// 		}
//
// }
//-----------------------------------------------------------------------------------

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
		public ResponseEntity<?> getAllInfoList(@PathVariable("communityId") Long communityId) {
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
		public ResponseEntity<?> newCommunityComment(@RequestBody CommunityBoardComments comment) { // 새 정보글 등록
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

		@DeleteMapping("/{communityId}/{commentId}/delete")
		public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
				try {
						communityBoardCommentService.deleteComment(commentId);
						return ResponseEntity.ok("Comment deleted successfully");
				} catch (Exception e) {
						logger.error("Error while deleting comment", e);
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting comment");
				}
		}

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
