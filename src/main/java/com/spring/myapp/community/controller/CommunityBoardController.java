package com.spring.myapp.community.controller;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.community.service.CommunityBoardService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityBoardController {
	private final CommunityBoardService communityBoardService;

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
				// communityBoardService.incrementViewCount(id);
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
		@DeleteMapping("/posts/{id}")
		public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
				communityBoardService.deletePost(id);
				return ResponseEntity.ok().build();
		}

}