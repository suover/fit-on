package com.spring.myapp.community.repository;

import org.apache.ibatis.annotations.Mapper;
import com.spring.myapp.community.dto.CommunityBoardCommentDTO;
import java.util.List;

@Mapper
public interface CommunityBoardCommentMapper {
		void insertComment(CommunityBoardCommentDTO communityBoardCommentDTO);

		// List<CommunityBoardCommentDTO> selectCommentsByCommunityId(@Param("communityId") Long communityId);
		//
		// CommunityBoardCommentDTO selectCommentById(@Param("commentId") Long commentId);

		List<CommunityBoardCommentDTO> selectCommentsByCommunityId(Long communityId);

		CommunityBoardCommentDTO selectCommentById(Long commentId);

		void updateComment(CommunityBoardCommentDTO communityBoardCommentDTO);

		// void deleteComment(@Param("commentId") Long commentId);
		void deleteComment(Long commentId);

		// CommunityBoardCommentDTO selectCommentByIdAndCommunityId(@Param("commentId") Long commentId, @Param("communityId") Long communityId);

		List<CommunityBoardCommentDTO> selectRepliesByCommentId(Long commentId);

		CommunityBoardCommentDTO selectCommentByIdAndCommunityId(Long commentId, Long communityId);
}
