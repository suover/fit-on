package com.spring.myapp.routineBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.routineBoard.model.RoutineComments;
import com.spring.myapp.routineBoard.repository.RoutineCommentsMapper;

@Service
public class RoutineCommentsService {

	private static final Logger logger = LoggerFactory.getLogger(RoutineCommentsService.class);

	@Autowired
	private RoutineCommentsMapper routineCommentsMapper;

	// 루틴 아이디로 모든 댓글 조회
	public List<RoutineComments> getAllComments(Long routineId) {
		return routineCommentsMapper.getAllRoutineComments(routineId);
	}

	// 새로운 댓글 작성
	public RoutineComments writeNewComment(RoutineComments comment) {
		RoutineComments newComment = new RoutineComments();

		if (comment.getCommentId() != null) { // 대댓글일때 commentId 가 있다면 추가
			newComment.setParentCommentId(comment.getCommentId());
		}

		newComment.setRoutineId(comment.getRoutineId());
		newComment.setUserId(comment.getUserId());
		newComment.setContent(comment.getContent());
		newComment.setCreatedAt(LocalDateTime.now());
		newComment.setIsDeleted(false);

		routineCommentsMapper.writeNewRoutineComment(newComment);

		return routineCommentsMapper.getRoutineCommentById(newComment.getCommentId());
	}

	public List<RoutineComments> getAllRoutineReplies(Long commentId) {
		return routineCommentsMapper.getRoutineRepliesById(commentId);
	}

	// 댓글 삭제
	public void deleteComment(Long commentId) {
		routineCommentsMapper.deleteRoutineComment(commentId);
	}

	// 댓글 수정
	public void updateComment(Long commentId, String content) {
		routineCommentsMapper.updateRoutineComment(commentId, content);
	}
}
