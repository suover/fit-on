package com.spring.myapp.community.repository;

import java.util.List;
import com.spring.myapp.community.dto.CommunityBoardDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommunityBoardMapper {
		void insert(CommunityBoardDTO communityBoardDTO);
		List<CommunityBoardDTO> findAllPosts();
		CommunityBoardDTO findPostById(Long id);
		void updatePost(CommunityBoardDTO communityBoardDTO);
		void deletePost(Long id);
		void incrementViewCount(@Param("id") Long id);

		// 조회수 상위 10개의 게시물 가져오기
		List<CommunityBoardDTO> selectTop10PopularPosts(@Param("limit") int limit);

}