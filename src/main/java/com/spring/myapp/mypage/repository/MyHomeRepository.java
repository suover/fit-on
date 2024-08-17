package com.spring.myapp.mypage.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.mypage.model.MyHomeStatistics;

/**
 * MyHomeRepository는 MyHome 페이지와 관련된 데이터를 데이터베이스에서 조회하는데 사용됩니다.
 */
@Mapper
public interface MyHomeRepository {

	/**
	 * 주어진 사용자 ID에 대한 글 작성 수, 댓글 수, 좋아요 수를 데이터베이스에서 조회합니다.
	 *
	 * @param userId 조회할 사용자의 ID
	 * @return MyHomeStatistics 객체, 사용자의 글 작성 수, 댓글 수, 좋아요 수 정보를 포함
	 */
	MyHomeStatistics getUserStatistics(@Param("userId") Long userId);
}
