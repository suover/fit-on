package com.spring.myapp.mypage.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;

import com.spring.myapp.mypage.dto.PostManagementDto;

/**
 * 게시글 관리 관련 매퍼
 */
@Mapper
public interface PostManagementRepository {
	/**
	 * 사용자가 작성한 커뮤니티 게시글 조회 및 검색
	 *
	 * @param userId 사용자 ID
	 * @param search 검색어 (null 또는 빈 문자열일 경우 전체 조회)
	 * @param pageable 페이징 정보
	 * @return 게시글 리스트
	 */
	List<PostManagementDto> findCommunityPostsByUser(@Param("userId") int userId, @Param("search") String search,
		@Param("pageable") Pageable pageable);

	/**
	 * 사용자가 작성한 루틴 게시글 조회 및 검색
	 *
	 * @param userId 사용자 ID
	 * @param search 검색어 (null 또는 빈 문자열일 경우 전체 조회)
	 * @param pageable 페이징 정보
	 * @return 게시글 리스트
	 */
	List<PostManagementDto> findRoutinePostsByUser(@Param("userId") int userId, @Param("search") String search,
		@Param("pageable") Pageable pageable);

	/**
	 * 사용자가 작성한 커뮤니티 게시글의 총 개수
	 *
	 * @param userId 사용자 ID
	 * @param search 검색어 (null 또는 빈 문자열일 경우 전체 조회)
	 * @return 게시글의 총 개수
	 */
	int countCommunityPostsByUser(@Param("userId") int userId, @Param("search") String search);

	/**
	 * 사용자가 작성한 루틴 게시글의 총 개수
	 *
	 * @param userId 사용자 ID
	 * @param search 검색어 (null 또는 빈 문자열일 경우 전체 조회)
	 * @return 게시글의 총 개수
	 */
	int countRoutinePostsByUser(@Param("userId") int userId, @Param("search") String search);
}
