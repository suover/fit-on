package com.spring.myapp.community.controller;


import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.community.service.CommunityBoardService;
import com.spring.myapp.community.service.CommunityBoardLikesService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityBoardController {
	private final CommunityBoardService communityBoardService;
		private final CommunityBoardLikesService communityBoardLikesService;

	private static Logger logger = LoggerFactory.getLogger(CommunityBoardController.class);

		// 모든 게시글 가져오기
		@GetMapping("/posts")
		public ResponseEntity<List<CommunityBoardDTO>>  getAllPosts() {
				List<CommunityBoardDTO> posts = communityBoardService.findAllPosts();
				return ResponseEntity.ok(posts);
		}

		// 게시글 작성
		@PostMapping("/posts")
		public ResponseEntity<CommunityBoardDTO> createPost(@RequestBody CommunityBoardDTO communityBoardDTO) {
				if (communityBoardDTO.getCategoryId() == null) {
						throw new IllegalArgumentException("Category ID cannot be null");
				}
				CommunityBoardDTO savedPost = communityBoardService.save(communityBoardDTO);
				return ResponseEntity.ok(savedPost);
		}

		// 특정 게시글 가져오기
		@GetMapping("/posts/{id}")
		public ResponseEntity<CommunityBoardDTO> getPostById(@PathVariable("id") Long id) {
				// 조회수 증가
				communityBoardService.incrementViewCount(id);
				CommunityBoardDTO post = communityBoardService.findPostById(id);
				return ResponseEntity.ok(post);
		}

		// 게시글 업데이트
		@PutMapping("/posts/{id}")
		public ResponseEntity<CommunityBoardDTO> updatePost(@PathVariable("id") Long id, @RequestBody CommunityBoardDTO communityBoardDTO) {
				communityBoardDTO.setCommunityId(id);
				CommunityBoardDTO updatedPost = communityBoardService.updatePost(id, communityBoardDTO);
				return ResponseEntity.ok(updatedPost);
		}

		// 게시글 삭제
		@PutMapping("/posts/{id}/delete")
		public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
				communityBoardService.deletePost(id);
				return ResponseEntity.ok().build();
		}

		// 좋아요 처리
		@PostMapping("/posts/{id}/like")
		public ResponseEntity<?> likePost(@PathVariable("id") Long id,
				@RequestParam("userId") Long userId) {

				try {
						boolean isLiked = communityBoardLikesService.toggleLike(id, userId);
						if (isLiked) {
								logger.info("User {} liked post {}", userId, id);
								return ResponseEntity.ok("Liked");
						} else {
								logger.info("User {} unliked post {}", userId, id);
								return ResponseEntity.ok("Unliked");
						}
				} catch (Exception e) {
						logger.error("Error toggling like for post {} by user {}", id, userId, e);
						return ResponseEntity.status(500).body("Error toggling like");
				}
		}

		//TOP 10 인기글
		@GetMapping("/posts/popular")
		public List<CommunityBoardDTO> getTop10PopularPosts(@RequestParam(name = "limit", defaultValue = "10") int limit) {
				return communityBoardService.getTop10PopularPosts(limit);
		}

}