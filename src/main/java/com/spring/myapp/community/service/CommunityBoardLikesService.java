package com.spring.myapp.community.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.community.dto.CommunityBoardLikesDTO;
import com.spring.myapp.community.repository.CommunityLikesMapper;


@Service
public class CommunityBoardLikesService {

		@Autowired
		private CommunityLikesMapper likesMapper;

		public boolean toggleLike(Long id, Long userId) {
				Integer likeCheck = likesMapper.checkLikes(id, userId);

				if (likeCheck == null || likeCheck <= 0) {
						CommunityBoardLikesDTO newLikes = new CommunityBoardLikesDTO();
						newLikes.setId(id);
						newLikes.setUserId(userId);
						newLikes.setCreatedAt(LocalDateTime.now());
						likesMapper.increaseLike(newLikes);
						return true;
				} else {
						likesMapper.decreaseLike(id, userId);
						return false;
				}
		}

		public int countLikes(Long id) {
				return likesMapper.countLikes(id);
		}
}