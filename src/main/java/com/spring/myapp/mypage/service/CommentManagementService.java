package com.spring.myapp.mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.myapp.mypage.dto.CommentManagementDTO;
import com.spring.myapp.mypage.repository.CommentManagementRepository;

/**
 * 댓글 관리 서비스 클래스입니다.
 */
@Service
public class CommentManagementService {

	private final CommentManagementRepository commentManagementRepository;

	/**
	 * CommentManagementService의 생성자입니다.
	 *
	 * @param commentManagementRepository 댓글 관리를 위한 리포지토리
	 */
	@Autowired
	public CommentManagementService(CommentManagementRepository commentManagementRepository) {
		this.commentManagementRepository = commentManagementRepository;
	}

	/**
	 * 사용자의 댓글을 조회합니다.
	 *
	 * @param type 댓글 타입 (community, routine, info)
	 * @param userId 사용자 ID
	 * @param search 검색어
	 * @param page 페이지 번호
	 * @param size 페이지 크기
	 * @return 페이징된 댓글 리스트와 총 댓글 수를 포함한 페이징 객체
	 * @throws IllegalArgumentException 잘못된 댓글 타입일 경우 예외 발생
	 */
	public Page<CommentManagementDTO> getUserComments(String type, int userId, String search, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		List<CommentManagementDTO> comments;
		int totalComments;

		if ("community".equals(type)) {
			comments = commentManagementRepository.findCommunityCommentsByUser(userId, search, pageable);
			totalComments = commentManagementRepository.countCommunityCommentsByUser(userId, search);
		} else if ("routine".equals(type)) {
			comments = commentManagementRepository.findRoutineCommentsByUser(userId, search, pageable);
			totalComments = commentManagementRepository.countRoutineCommentsByUser(userId, search);
		} else if ("info".equals(type)) {
			comments = commentManagementRepository.findInfoCommentsByUser(userId, search, pageable);
			totalComments = commentManagementRepository.countInfoCommentsByUser(userId, search);
		} else {
			throw new IllegalArgumentException("잘못된 댓글 타입: " + type);
		}

		return new PageImpl<>(comments, pageable, totalComments);
	}
}
