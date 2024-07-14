package com.spring.myapp.community.service;

// import org.springframework.stereotype.Service;
//
// import com.spring.myapp.community.dto.CommunityBoardCommentDTO;
// import com.spring.myapp.community.repository.CommunityBoardCommentMapper;
//
// import lombok.RequiredArgsConstructor;
// import org.springframework.transaction.annotation.Transactional;
//
// import java.util.List;

//-------------------------------------원래코드--------------------------------------//
// @Service
// @RequiredArgsConstructor
// public class CommunityBoardCommentService {
// 		private final CommunityBoardCommentMapper communityBoardCommentMapper;
//
// 		// 댓글 저장
// 		public CommunityBoardCommentDTO save(CommunityBoardCommentDTO communityBoardCommentDTO) {
// 				// 동일한 내용의 댓글이 이미 있는지 확인
// 				// List<CommunityBoardCommentDTO> existingComments = communityBoardCommentMapper.selectCommentsByCommunityId(communityBoardCommentDTO.getCommunityId());
// 				// for (CommunityBoardCommentDTO comment : existingComments) {
// 				// 		if (comment.getUserId().equals(communityBoardCommentDTO.getUserId()) &&
// 				// 				comment.getContent().equals(communityBoardCommentDTO.getContent())) {
// 				// 				throw new IllegalArgumentException("동일한 내용의 댓글이 이미 존재합니다.");
// 				// 		}
// 				// }
// 				communityBoardCommentMapper.insertComment(communityBoardCommentDTO);
// 				return communityBoardCommentDTO;
// 		}
//
// 		// 특정 게시글의 모든 댓글 조회
// 		public List<CommunityBoardCommentDTO> findAllByCommunityId(Long communityId) {
// 				return communityBoardCommentMapper.selectCommentsByCommunityId(communityId);
// 		}
//
// 		// 특정 댓글 조회
// 		public CommunityBoardCommentDTO findById(Long commentId) {
// 				return communityBoardCommentMapper.selectCommentById(commentId);
// 		}
//
// 		// 특정 댓글의 모든 답글 조회
// 		public List<CommunityBoardCommentDTO> findRepliesByCommentId(Long commentId) {
// 				return communityBoardCommentMapper.selectRepliesByCommentId(commentId);
// 		}
//
// 		// 특정 게시글의 특정 댓글 조회
// 		public CommunityBoardCommentDTO findByIdAndCommunityId(Long commentId, Long communityId) {
// 				return communityBoardCommentMapper.selectCommentByIdAndCommunityId(commentId, communityId);
// 		}
//
// 		// 댓글 업데이트
// 		public CommunityBoardCommentDTO update(CommunityBoardCommentDTO communityBoardCommentDTO) {
// 				communityBoardCommentMapper.updateComment(communityBoardCommentDTO);
// 				// return communityBoardCommentDTO;
// 				return communityBoardCommentMapper.selectCommentById(communityBoardCommentDTO.getCommentId());
// 		}
//
//
// 		// 특정 게시글의 모든 댓글 삭제
// 		@Transactional
// 		public void deleteCommentsByCommunityId(Long communityId) {
// 				communityBoardCommentMapper.deleteCommentsByCommunityId(communityId);
// 		}
//
//
// 		// 특정 댓글 논리 삭제
// 		@Transactional
// 		public void softDelete(Long commentId) {
// 				communityBoardCommentMapper.softDeleteComment(commentId);
// 		}
// }

//---------------------------------------------------------------------------
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

				if (comment.getCommentId() != null) { // 대댓글일때 commentId 가 있다면 추가
						newComment.setParentCommentId(comment.getCommentId());
				}

				newComment.setCommunityId(comment.getCommunityId());
				newComment.setUserId(comment.getUserId());
				newComment.setContent(comment.getContent());
				newComment.setCreatedAt(LocalDateTime.now());
				newComment.setUpdatedAt(LocalDateTime.now());
				newComment.setIsDeleted(false);

				// 댓글 삽입
				communityBoardCommentMapper.writeNewComment(newComment);

				// 삽입된 댓글의 전체 정보를 조회
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