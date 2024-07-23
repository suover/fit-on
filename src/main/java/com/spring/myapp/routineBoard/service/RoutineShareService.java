package com.spring.myapp.routineBoard.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.routineBoard.model.RoutineShare;
import com.spring.myapp.routineBoard.repository.RoutineShareMapper;

@Service
public class RoutineShareService {

	@Autowired
	private RoutineShareMapper routineShareMapper;

	public Long createShare(Long routineId, Long userId) {
		RoutineShare routineShare = new RoutineShare();
		routineShare.setShareId(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
		routineShare.setRoutineId(routineId);
		routineShare.setUserId(userId);
		routineShare.setSharedAt(LocalDateTime.now());
		routineShareMapper.insertShare(routineShare);
		return routineShare.getShareId();
	}

	public RoutineShare getShareByShareId(Long shareId) {
		return routineShareMapper.findByShareId(shareId);
	}
}
