package com.spring.myapp.informationBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.informationBoard.model.Comments;

@Mapper
public interface InfoCommentsMapper {

	public List<Comments> getAllComments(@Param("infoId") Long infoId);

	public void writeNewComment(Comments comment);

	public Comments getCommentById(@Param("commentId") Long commentId);

	public List<Comments> getRepliesById(@Param("commentId") Long commentId);

	public void deleteComment(@Param("commentId") Long commentId);
}
