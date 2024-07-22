package com.spring.myapp.routineBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.routineBoard.model.RoutineComments;

@Mapper
public interface RoutineCommentsMapper {

	public List<RoutineComments> getAllRoutineComments(@Param("routineId") Long routineId);

	public void writeNewRoutineComment(RoutineComments comment);

	public RoutineComments getRoutineCommentById(@Param("commentId") Long commentId);

	public List<RoutineComments> getRoutineRepliesById(@Param("commentId") Long commentId);

	public void deleteRoutineComment(@Param("commentId") Long commentId);

	void updateRoutineComment(@Param("commentId") Long commentId, @Param("content") String content);
}
