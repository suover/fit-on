package com.spring.myapp.community.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
				System.out.println("##### Add comment request received for communityId: " + communityId); // 로그 추가
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

		//댓글 업데이트
		@PutMapping("/comments/{commentId}")
		public ResponseEntity<CommunityBoardCommentDTO> updateComment(
					@PathVariable("commentId") Long commentId,
					@RequestBody CommunityBoardCommentDTO communityBoardCommentDTO) {
				communityBoardCommentDTO.setCommentId(commentId);
				CommunityBoardCommentDTO updatedComment = communityBoardCommentService.update(communityBoardCommentDTO);
				// 업데이트된 댓글을 다시 조회하여 반환
				CommunityBoardCommentDTO fullUpdatedComment = communityBoardCommentService.findById(commentId);
				return ResponseEntity.ok(updatedComment);
		}

		//댓글 삭제
		@DeleteMapping("/comments/{commentId}")
		public ResponseEntity<Void> deleteComment(
					@PathVariable("commentId") Long commentId) {
				// communityBoardCommentService.delete(commentId);
				communityBoardCommentService.softDelete(commentId); // softDelete 메서드 호출
				return ResponseEntity.ok().build();
		}

		//특정 댓글의 모든 답글 가져오기
		@GetMapping("/posts/{communityId}/comments/{commentId}/replies")
		public ResponseEntity<List<CommunityBoardCommentDTO>> getRepliesForComment(
				@PathVariable("communityId") Long communityId,
				@PathVariable("commentId") Long commentId) {
				if (commentId == null) {
						return ResponseEntity.badRequest().build();
				}
				List<CommunityBoardCommentDTO> replies = communityBoardCommentService.findRepliesByCommentId(commentId);
				return ResponseEntity.ok(replies);
		}

}
