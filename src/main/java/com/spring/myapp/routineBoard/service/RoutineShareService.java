package com.spring.myapp.routineBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.model.RoutineShare;
import com.spring.myapp.routineBoard.repository.RoutineShareMapper;

@Service
public class RoutineShareService {

	@Autowired
	private RoutineShareMapper routineShareMapper;

	public void createShare(Long routineId, Long userId) {
		RoutineShare routineShare = new RoutineShare();
		routineShare.setRoutineId(routineId);
		routineShare.setUserId(userId);
		routineShare.setSharedAt(LocalDateTime.now());
		routineShareMapper.insertShare(routineShare);
	}

	public void deleteShare(Long routineId, Long userId) {
		routineShareMapper.deleteShare(routineId, userId);
	}

	public boolean isShared(Long routineId, Long userId) {
		return routineShareMapper.isShared(routineId, userId);
	}

	public List<RoutineBoard> getSharedRoutinesByUserId(Long userId) {
		return routineShareMapper.findSharedRoutinesByUserId(userId);
	}

	public int getSharesCount(Long routineId) {
		return routineShareMapper.countByRoutineId(routineId);
	}
}
