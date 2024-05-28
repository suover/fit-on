package com.spring.myapp.informationBoard.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.informationBoard.model.Likes;

@Mapper
public interface InfoLikesMapper {

	int countLikes(@Param("infoId") Long infoId);

	void increaseLike(Likes likes);

	void decreaseLike(@Param("infoId") Long infoId, @Param("userId") Long userId);

	boolean checkLikes(@Param("infoId") Long infoId, @Param("userId") Long userId);
}
