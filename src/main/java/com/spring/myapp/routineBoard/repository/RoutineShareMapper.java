package com.spring.myapp.routineBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.model.RoutineShare;

public interface RoutineShareMapper {
	void insertShare(RoutineShare routineShare);

	void deleteShare(@Param("routineId") Long routineId, @Param("userId") Long userId);

	boolean isShared(@Param("routineId") Long routineId, @Param("userId") Long userId);

	List<RoutineBoard> findSharedRoutinesByUserId(@Param("userId") Long userId);

	int countByRoutineId(@Param("routineId") Long routineId);
}
