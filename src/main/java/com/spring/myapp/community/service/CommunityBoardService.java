package com.spring.myapp.community.service;

import java.sql.Timestamp;
import java.util.List;

import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.community.model.CommunityBoardUserDetails;
import com.spring.myapp.community.repository.CommunityBoardCommentMapper;
import com.spring.myapp.community.repository.CommunityBoardMapper;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityBoardService {
		private final CommunityBoardMapper communityMapper;
		private final CommunityBoardCommentMapper commentMapper;

		// 모든 게시글 조회
		public List<CommunityBoardDTO> findAllPosts() {
				return communityMapper.findAllPosts();
		}

		// 게시글 저장
		@Transactional
		public CommunityBoardDTO save(CommunityBoardDTO communityBoardDTO) {
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getName())) {
						throw new IllegalArgumentException("로그인한 사용자만 글을 작성할 수 있습니다.");
				}

				CommunityBoardUserDetails userDetails = (CommunityBoardUserDetails) authentication.getPrincipal();
				Long userId = userDetails.getUserId(); // 사용자 ID 가져오기
				communityBoardDTO.setUserId(userId);

				// 추가 확인
				if (communityBoardDTO.getCategoryId() == null) {
						throw new IllegalArgumentException("Category ID cannot be null");
				}

				communityMapper.insert(communityBoardDTO);
				return communityBoardDTO;
		}

		// 특정 게시글 조회
		public CommunityBoardDTO findPostById(Long id) {
				CommunityBoardDTO post = communityMapper.findPostById(id);
				if (post == null) {
						throw new IllegalArgumentException("해당 게시글을 찾을 수 없습니다.");
				}
				return post;
		}

		// 조회수 증가 메서드
		@Transactional
		public void incrementViewCount(Long id) {
				communityMapper.incrementViewCount(id);
		}

		// 게시글 업데이트
		@Transactional
		public CommunityBoardDTO updatePost(Long id, CommunityBoardDTO communityBoardDTO) {

				CommunityBoardDTO existingPost = communityMapper.findPostById(id);
				if (existingPost == null) {
						throw new IllegalArgumentException("해당 게시글을 찾을 수 없습니다.");
				}
				// 사용자 ID와 카테고리 ID를 기존 게시글에서 가져와 설정
				communityBoardDTO.setCommunityId(id);
				communityBoardDTO.setUserId(existingPost.getUserId());

				// createdAt 필드를 기존 게시글의 값으로 설정
				communityBoardDTO.setCreatedAt(existingPost.getCreatedAt());

				// updatedAt 필드를 현재 시간으로 설정
				communityBoardDTO.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

				//수정한 categoryId 반영
				if (communityBoardDTO.getCategoryId() == null) {
						communityBoardDTO.setCategoryId(existingPost.getCategoryId());
				}
				
				communityMapper.updatePost(communityBoardDTO);
				return communityBoardDTO;
		}

		// 게시글 삭제
		@Transactional
		public void deletePost(Long id) {
				CommunityBoardDTO existingPost = communityMapper.findPostById(id);
				if (existingPost == null) {
						throw new IllegalArgumentException("해당 게시글을 찾을 수 없습니다.");
				}
				// 댓글 소프트 삭제
				commentMapper.deleteCommentsByCommunityId(id);
				// 게시글 소프트 삭제
				communityMapper.deletePost(id);
		}


		public List<CommunityBoardDTO> getTop10PopularPosts(int limit) {
				return communityMapper.selectTop10PopularPosts(limit);
		}
}