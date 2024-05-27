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

	void insertRoutineItems(@Param("routineId") Long routineId, @Param("routineItems") List<String> routineItems);

	String findGoalNameById(@Param("goalId") int goalId);

	String findLevelNameById(@Param("levelId") int levelId);

	String findPartNameById(@Param("partId") int partId);
}
