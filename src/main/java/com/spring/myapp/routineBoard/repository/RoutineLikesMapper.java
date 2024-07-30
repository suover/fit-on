package com.spring.myapp.routineBoard.repository;

import java.time.LocalDateTime;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RoutineLikesMapper {
	void increaseLike(@Param("routineId") Long routineId, @Param("userId") Long userId,
		@Param("createdAt") LocalDateTime createdAt);

	void decreaseLike(@Param("routineId") Long routineId, @Param("userId") Long userId);

	Integer checkLike(@Param("routineId") Long routineId, @Param("userId") Long userId);

	int countLikes(@Param("routineId") Long routineId);
}
