package com.spring.myapp.routineBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.routineBoard.model.RoutineComments;

@Mapper
public interface RoutineCommentsMapper {

	// 루틴 아이디로 댓글 조회
	List<RoutineComments> getAllRoutineComments(@Param("routineId") Long routineId);

	// 새로운 댓글 작성
	void writeNewRoutineComment(RoutineComments comment);

	// 댓글 아이디로 댓글 조회
	RoutineComments getRoutineCommentById(@Param("commentId") Long commentId);

	// 특정 댓글의 답글 조회
	List<RoutineComments> getRoutineRepliesById(@Param("commentId") Long commentId);

	// 댓글 삭제
	void deleteRoutineComment(@Param("commentId") Long commentId);

	// 댓글 수정
	void updateRoutineComment(@Param("commentId") Long commentId, @Param("content") String content);
}
