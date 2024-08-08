package com.spring.myapp.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.mypage.dto.CommentManagementDTO;
import com.spring.myapp.mypage.service.CommentManagementService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * CommentManagement 관련 요청을 처리하는 컨트롤러입니다.
 * 이 컨트롤러는 댓글 관리 페이지를 위한 엔드포인트를 제공합니다.
 */
@RestController
@RequestMapping("/api/mypage/comment-management")
@Tag(name = "CommentManagement", description = "CommentManagement 기능 관련 API")
public class CommentManagementController {

	private final CommentManagementService commentManagementService;

	@Autowired
	public CommentManagementController(CommentManagementService commentManagementService) {
		this.commentManagementService = commentManagementService;
	}

	/**
	 * 사용자가 작성한 댓글 조회
	 *
	 * @param type 댓글 타입 (community, routine, info)
	 * @param userId 사용자 ID
	 * @param query 검색어
	 * @param page 페이지 번호
	 * @param size 페이지 크기
	 * @return 댓글 리스트와 페이징 정보
	 */
	@Operation(summary = "사용자가 작성한 댓글 조회", description = "사용자가 작성한 커뮤니티, 루틴, 정보 댓글을 조회합니다.")
	@GetMapping("/comments")
	public ResponseEntity<Page<CommentManagementDTO>> getUserComments(
		@Parameter(description = "댓글 타입 (community, routine, info)", required = true)
		@RequestParam("type") String type,
		@Parameter(description = "사용자 ID", required = true)
		@RequestParam("userId") int userId,
		@Parameter(description = "검색어") @RequestParam(value = "query", required = false) String query,
		@Parameter(description = "페이지 번호") @RequestParam(value = "page", defaultValue = "0") int page,
		@Parameter(description = "페이지 크기") @RequestParam(value = "size", defaultValue = "10") int size) {
		Page<CommentManagementDTO> comments = commentManagementService.getUserComments(type, userId, query, page, size);
		return ResponseEntity.ok(comments);
	}
}
