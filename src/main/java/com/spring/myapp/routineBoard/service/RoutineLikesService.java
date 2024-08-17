package com.spring.myapp.routineBoard.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.myapp.routineBoard.repository.RoutineLikesMapper;

@Service
public class RoutineLikesService {
	@Autowired
	private RoutineLikesMapper routineLikesMapper;

	@Transactional
	public void likeRoutine(Long routineId, Long userId) {
		LocalDateTime createdAt = LocalDateTime.now();
		routineLikesMapper.increaseLike(routineId, userId, createdAt);
	}

	@Transactional
	public void unlikeRoutine(Long routineId, Long userId) {
		routineLikesMapper.decreaseLike(routineId, userId);
	}

	public boolean isLiked(Long routineId, Long userId) {
		return routineLikesMapper.checkLike(routineId, userId) != null;
	}

	public int getLikesCount(Long routineId) {
		return routineLikesMapper.countLikes(routineId);
	}
}
