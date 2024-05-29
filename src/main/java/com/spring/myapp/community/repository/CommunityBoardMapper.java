package com.spring.myapp.community.repository;

import java.util.List;
import com.spring.myapp.community.dto.CommunityBoardDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface CommunityBoardMapper {
		void insert(CommunityBoardDTO communityBoardDTO);
		List<CommunityBoardDTO> findAllPosts();
		CommunityBoardDTO findPostById(Long id);
		void updatePost(CommunityBoardDTO communityBoardDTO);
		void deletePost(Long id);

}