package com.spring.myapp.routineBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.routineBoard.model.RoutineBoard;

@Mapper
public interface RoutineBoardMapper {
	List<RoutineBoard> findAll();

	RoutineBoard findById(@Param("routineId") Long routineId);

	void insertRoutineBoard(RoutineBoard routineBoard);

	void updateIsDeletedById(@Param("routineId") Long routineId);

	void insertRoutineItems(@Param("routineId") Integer routineId, @Param("routineItems") List<String> routineItems);

	String findGoalNameById(@Param("goalId") Integer goalId);

	String findLevelNameById(@Param("levelId") Integer levelId);

	String findPartNameById(@Param("partId") Integer partId);
}
