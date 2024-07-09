package com.spring.myapp.community.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.community.dto.CommunityBoardCommentDTO;
import com.spring.myapp.community.service.CommunityBoardCommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityBoardCommentController {
		private final CommunityBoardCommentService communityBoardCommentService;

		//댓글 작성
		@PostMapping("/posts/{communityId}/newComments")
		public ResponseEntity<CommunityBoardCommentDTO> addComment(
				  @PathVariable("communityId") Long communityId,
				  @RequestBody CommunityBoardCommentDTO communityBoardCommentDTO) {
				System.out.println("##### Add comment request received for communityId: " + communityId);
				communityBoardCommentDTO.setCommunityId(communityId);
				CommunityBoardCommentDTO savedComment = communityBoardCommentService.save(communityBoardCommentDTO);
				return ResponseEntity.ok(savedComment);
		}

		//특정 게시글의 모든 댓글 가져오기
		@GetMapping("/posts/{communityId}/comments")
		public ResponseEntity<List<CommunityBoardCommentDTO>> getAllCommentsForPost(
					@PathVariable("communityId") Long communityId) {
				List<CommunityBoardCommentDTO> comments = communityBoardCommentService.findAllByCommunityId(communityId);
				return ResponseEntity.ok(comments);
		}

		//특정 댓글 조회
		// @GetMapping("/comments/{communityId}")
		// public ResponseEntity<CommunityBoardCommentDTO> getCommentById(
		// 		@PathVariable("communityId") Long communityId) {
		// 		CommunityBoardCommentDTO comment = communityBoardCommentService.findById(communityId);
		// 		return ResponseEntity.ok(comment);
		// }

		//필요없을것같아서
		// @GetMapping("/posts/{communityId}/comments/{commentId}")
		// public ResponseEntity<CommunityBoardCommentDTO> getCommentById(
		// // public ResponseEntity<List<CommunityBoardCommentDTO>> getCommentById(
		// 		@PathVariable("communityId") Long communityId,
		// 		@PathVariable("commentId") Long commentId) {
		// 		CommunityBoardCommentDTO comment = communityBoardCommentService.findByIdAndCommunityId(commentId, communityId);
		// 		// List<CommunityBoardCommentDTO> comments = communityBoardCommentService.findRepliesByCommentId(commentId);
		// 		return ResponseEntity.ok(comment);
		// }

		//댓글 업데이트
		@PutMapping("/comments/{commentId}")
		public ResponseEntity<CommunityBoardCommentDTO> updateComment(
					@PathVariable("commentId") Long commentId,
					@RequestBody CommunityBoardCommentDTO communityBoardCommentDTO) {
				communityBoardCommentDTO.setCommentId(commentId);
				CommunityBoardCommentDTO updatedComment = communityBoardCommentService.update(communityBoardCommentDTO);
				return ResponseEntity.ok(updatedComment);
		}

		//댓글 삭제
		@DeleteMapping("/comments/{commentId}")
		public ResponseEntity<Void> deleteComment(
					@PathVariable("commentId") Long commentId) {
				communityBoardCommentService.delete(commentId);
				return ResponseEntity.ok().build();
		}

		//특정 댓글의 모든 답글 가져오기
		@GetMapping("/posts/{communityId}/comments/{commentId}/replies")
		public ResponseEntity<List<CommunityBoardCommentDTO>> getRepliesForComment(
				@PathVariable("communityId") Long communityId,
				@PathVariable("commentId") Long commentId) {
				List<CommunityBoardCommentDTO> replies = communityBoardCommentService.findRepliesByCommentId(commentId);
				return ResponseEntity.ok(replies);
		}

}
