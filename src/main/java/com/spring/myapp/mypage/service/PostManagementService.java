package com.spring.myapp.mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.myapp.mypage.dto.PostManagementDto;
import com.spring.myapp.mypage.repository.PostManagementRepository;

/**
 * 게시글 관리 서비스 클래스입니다.
 */
@Service
public class PostManagementService {

	private final PostManagementRepository postManagementRepository;

	/**
	 * PostManagementService의 생성자입니다.
	 *
	 * @param postManagementRepository 게시글 관리를 위한 리포지토리
	 */
	@Autowired
	public PostManagementService(PostManagementRepository postManagementRepository) {
		this.postManagementRepository = postManagementRepository;
	}

	/**
	 * 사용자의 게시글을 조회합니다.
	 *
	 * @param type 게시글 타입 (community 또는 routine)
	 * @param userId 사용자 ID
	 * @param search 검색어
	 * @param page 페이지 번호
	 * @param size 페이지 크기
	 * @return 페이징된 게시글 리스트와 총 게시글 수를 포함한 페이징 객체
	 * @throws IllegalArgumentException 잘못된 게시글 타입일 경우 예외 발생
	 */
	public Page<PostManagementDto> getUserPosts(String type, int userId, String search, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		List<PostManagementDto> posts;
		int totalPosts;

		if ("community".equals(type)) {
			posts = postManagementRepository.findCommunityPostsByUser(userId, search, pageable);
			totalPosts = postManagementRepository.countCommunityPostsByUser(userId, search);
		} else if ("routine".equals(type)) {
			posts = postManagementRepository.findRoutinePostsByUser(userId, search, pageable);
			totalPosts = postManagementRepository.countRoutinePostsByUser(userId, search);
		} else {
			throw new IllegalArgumentException("잘못된 게시글 타입: " + type);
		}

		return new PageImpl<>(posts, pageable, totalPosts);
	}
}
