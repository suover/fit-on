package com.spring.myapp.routineBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.routineBoard.model.RoutineShare;

@Mapper
public interface RoutineShareMapper {
	void insertShare(RoutineShare routineShare);

	RoutineShare findByShareId(@Param("shareId") Long shareId);

	List<RoutineShare> findByUserId(@Param("userId") Long userId);
}
