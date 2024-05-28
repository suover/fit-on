package com.spring.myapp.informationBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.informationBoard.model.Comments;
import com.spring.myapp.informationBoard.repository.InfoCommentsMapper;

@Service
public class InfoCommentsService {

	@Autowired
	InfoCommentsMapper infoCommentsMapper;

	public List<Comments> getAllComments(Long infoId) {
		return infoCommentsMapper.getAllComments(infoId);
	}

	public Comments writeNewComment(Comments comment) {

		Comments newComment = new Comments();

		if (comment.getCommentId() != null) { // 대댓글일때 commentId 가 있다면 추가
			newComment.setParentCommentId(comment.getCommentId());
		}

		newComment.setInfoId(comment.getInfoId());
		newComment.setUserId(comment.getUserId());
		newComment.setContent(comment.getContent());
		newComment.setUpdatedAt(LocalDateTime.now());
		newComment.setIsDeleted(false);

		infoCommentsMapper.writeNewComment(newComment);

		System.out.println("-------------------");
		System.out.println(newComment.getCommentId());
		System.out.println("-------------------");

		return infoCommentsMapper.getCommentById(newComment.getCommentId());
	}

	public List<Comments> getAllReplies(Long commentId) {
		return infoCommentsMapper.getRepliesById(commentId);
	}

	public void deleteComment(Long commentId) {
		infoCommentsMapper.deleteComment(commentId);
	}
}
