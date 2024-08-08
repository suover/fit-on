package com.spring.myapp.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.mypage.dto.PostManagementDTO;
import com.spring.myapp.mypage.service.PostManagementService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * PostManagement 관련 요청을 처리하는 컨트롤러입니다.
 * 이 컨트롤러는 게시글 관리 페이지를 위한 엔드포인트를 제공합니다.
 */
@RestController
@RequestMapping("/api/mypage/post-management")
@Tag(name = "PostManagement", description = "PostManagement 기능 관련 API")
public class PostManagementController {

	private final PostManagementService postManagementService;

	@Autowired
	public PostManagementController(PostManagementService postManagementService) {
		this.postManagementService = postManagementService;
	}

	/**
	 * 사용자가 작성한 게시글 조회
	 *
	 * @param type 게시글 타입 (community 또는 routine)
	 * @param userId 사용자 ID
	 * @param query 검색어
	 * @param page 페이지 번호
	 * @param size 페이지 크기
	 * @return 게시글 리스트와 페이징 정보
	 */
	@Operation(summary = "사용자가 작성한 게시글 조회", description = "사용자가 작성한 커뮤니티 게시글 또는 루틴 게시글을 조회합니다.")
	@GetMapping("/posts")
	public ResponseEntity<Page<PostManagementDTO>> getUserPosts(
		@Parameter(description = "게시글 타입 (community 또는 routine)", required = true)
		@RequestParam("type") String type,
		@Parameter(description = "사용자 ID", required = true)
		@RequestParam("userId") int userId,
		@Parameter(description = "검색어") @RequestParam(value = "query", required = false) String query,
		@Parameter(description = "페이지 번호") @RequestParam(value = "page", defaultValue = "0") int page,
		@Parameter(description = "페이지 크기") @RequestParam(value = "size", defaultValue = "10") int size) {
		Page<PostManagementDTO> posts = postManagementService.getUserPosts(type, userId, query, page, size);
		return ResponseEntity.ok(posts);
	}
}
