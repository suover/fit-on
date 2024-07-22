package com.spring.myapp.community.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.community.model.CommunityBoardComments;

import java.util.List;

	@Mapper
	public interface CommunityBoardCommentMapper {
	public List<CommunityBoardComments> getAllComments(@Param("communityId") Long communityId);

	public void writeNewComment(CommunityBoardComments comment);

	public CommunityBoardComments getCommentById(@Param("commentId") Long commentId);

	public List<CommunityBoardComments> getRepliesById(@Param("commentId") Long commentId);

	public void deleteComment(@Param("commentId") Long commentId);

	public void updateComment(@Param("commentId") Long commentId, @Param("content") String content);

				void deleteCommentsByCommunityId(@Param("communityId") Long communityId);
		}