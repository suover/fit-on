package com.spring.myapp.community.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.community.dto.CommunityBoardLikesDTO;

@Mapper
public interface CommunityLikesMapper {
		Integer checkLikes(@Param("id") Long id, @Param("userId") Long userId);
		void increaseLike(CommunityBoardLikesDTO likes);
		void decreaseLike(@Param("id") Long id, @Param("userId") Long userId);
		int countLikes(@Param("id") Long id);
}