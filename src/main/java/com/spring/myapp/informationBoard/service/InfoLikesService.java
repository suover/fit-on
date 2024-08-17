package com.spring.myapp.informationBoard.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.informationBoard.model.Likes;
import com.spring.myapp.informationBoard.repository.InfoLikesMapper;

@Service
public class InfoLikesService {

	@Autowired
	private InfoLikesMapper likesMapper;

	public boolean toggleLike(Long infoId, Long userId) {
		Integer likeCheck = likesMapper.checkLikes(infoId, userId);

		if (likeCheck == null || likeCheck <= 0) {
			Likes newLikes = new Likes();
			newLikes.setInfoId(infoId);
			newLikes.setUserId(userId);
			newLikes.setCreatedAt(LocalDateTime.now());
			likesMapper.increaseLike(newLikes);
			return true;
		} else {
			likesMapper.decreaseLike(infoId, userId);
			return false;
		}
	}

	public int countLikes(Long infoId) {
		return likesMapper.countLikes(infoId);
	}
}
