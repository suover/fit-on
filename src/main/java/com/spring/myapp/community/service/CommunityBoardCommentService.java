package com.spring.myapp.community.service;

import org.springframework.stereotype.Service;

import com.spring.myapp.community.dto.CommunityBoardCommentDTO;
import com.spring.myapp.community.repository.CommunityBoardCommentMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityBoardCommentService {
		private final CommunityBoardCommentMapper communityBoardCommentMapper;

		// 댓글 저장
		public CommunityBoardCommentDTO save(CommunityBoardCommentDTO communityBoardCommentDTO) {
				// 동일한 내용의 댓글이 이미 있는지 확인
				// List<CommunityBoardCommentDTO> existingComments = communityBoardCommentMapper.selectCommentsByCommunityId(communityBoardCommentDTO.getCommunityId());
				// for (CommunityBoardCommentDTO comment : existingComments) {
				// 		if (comment.getUserId().equals(communityBoardCommentDTO.getUserId()) &&
				// 				comment.getContent().equals(communityBoardCommentDTO.getContent())) {
				// 				throw new IllegalArgumentException("동일한 내용의 댓글이 이미 존재합니다.");
				// 		}
				// }
				communityBoardCommentMapper.insertComment(communityBoardCommentDTO);
				return communityBoardCommentDTO;
		}

		// 특정 게시글의 모든 댓글 조회
		public List<CommunityBoardCommentDTO> findAllByCommunityId(Long communityId) {
				return communityBoardCommentMapper.selectCommentsByCommunityId(communityId);
		}

		// 특정 댓글 조회
		public CommunityBoardCommentDTO findById(Long commentId) {
				return communityBoardCommentMapper.selectCommentById(commentId);
		}

		// 특정 댓글의 모든 답글 조회
		public List<CommunityBoardCommentDTO> findRepliesByCommentId(Long commentId) {
				return communityBoardCommentMapper.selectRepliesByCommentId(commentId);
		}

		// 특정 게시글의 특정 댓글 조회
		public CommunityBoardCommentDTO findByIdAndCommunityId(Long commentId, Long communityId) {
				return communityBoardCommentMapper.selectCommentByIdAndCommunityId(commentId, communityId);
		}

		// 댓글 업데이트
		public CommunityBoardCommentDTO update(CommunityBoardCommentDTO communityBoardCommentDTO) {
				communityBoardCommentMapper.updateComment(communityBoardCommentDTO);
				return communityBoardCommentDTO;
		}

		// 특정 게시글의 모든 댓글 삭제
		@Transactional
		public void deleteCommentsByCommunityId(Long communityId) {
				communityBoardCommentMapper.deleteCommentsByCommunityId(communityId);
		}


		// 특정 댓글 논리 삭제
		@Transactional
		public void softDelete(Long commentId) {
				communityBoardCommentMapper.softDeleteComment(commentId);
		}
}

