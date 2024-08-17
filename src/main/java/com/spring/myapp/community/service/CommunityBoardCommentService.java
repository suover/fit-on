package com.spring.myapp.community.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.community.model.CommunityBoardComments;
import com.spring.myapp.community.repository.CommunityBoardCommentMapper;

@Service
public class CommunityBoardCommentService {
		@Autowired
		CommunityBoardCommentMapper communityBoardCommentMapper;

		public List<CommunityBoardComments> getAllComments(Long communityId) {
				return communityBoardCommentMapper.getAllComments(communityId);
		}

		public CommunityBoardComments writeNewComment(CommunityBoardComments comment) {

				CommunityBoardComments newComment = new CommunityBoardComments();

				if (comment.getCommentId() != null) {
						newComment.setParentCommentId(comment.getCommentId());
				}

				newComment.setCommunityId(comment.getCommunityId());
				newComment.setUserId(comment.getUserId());
				newComment.setContent(comment.getContent());
				newComment.setCreatedAt(LocalDateTime.now());
				newComment.setUpdatedAt(LocalDateTime.now());
				newComment.setIsDeleted(false);

				communityBoardCommentMapper.writeNewComment(newComment);

				return communityBoardCommentMapper.getCommentById(newComment.getCommentId());
		}

		public List<CommunityBoardComments> getAllReplies(Long commentId) {
				return communityBoardCommentMapper.getRepliesById(commentId);
		}

		public void deleteComment(Long commentId) {
				communityBoardCommentMapper.deleteComment(commentId);
		}

		public void updateComment(Long commentId, String content) {
				communityBoardCommentMapper.updateComment(commentId, content);
		}

}