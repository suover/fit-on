package com.spring.myapp.community.service;

import org.springframework.stereotype.Service;

import com.spring.myapp.community.dto.CommunityBoardCommentDTO;
import com.spring.myapp.community.repository.CommunityBoardCommentMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityBoardCommentService {
		private final CommunityBoardCommentMapper communityBoardCommentMapper;


		public CommunityBoardCommentDTO save(CommunityBoardCommentDTO communityBoardCommentDTO) {
				communityBoardCommentMapper.insertComment(communityBoardCommentDTO);
				return communityBoardCommentDTO;
		}

		public List<CommunityBoardCommentDTO> findAllByCommunityId(Long communityId) {
				return communityBoardCommentMapper.selectCommentsByCommunityId(communityId);
		}

		public CommunityBoardCommentDTO findById(Long commentId) {
				return communityBoardCommentMapper.selectCommentById(commentId);
		}

		public List<CommunityBoardCommentDTO> findRepliesByCommentId(Long commentId) {
				return communityBoardCommentMapper.selectRepliesByCommentId(commentId);
		}

		public CommunityBoardCommentDTO findByIdAndCommunityId(Long commentId, Long communityId) {
				return communityBoardCommentMapper.selectCommentByIdAndCommunityId(commentId, communityId);
		}

		public CommunityBoardCommentDTO update(CommunityBoardCommentDTO communityBoardCommentDTO) {
				communityBoardCommentMapper.updateComment(communityBoardCommentDTO);
				return communityBoardCommentDTO;
		}

		public void delete(Long commentId) {
				communityBoardCommentMapper.deleteComment(commentId);
		}
}
