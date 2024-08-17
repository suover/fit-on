package com.spring.myapp.routineBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.repository.RoutineBoardMapper;

@Service
public class RoutineBoardService {

	@Autowired
	private RoutineBoardMapper routineBoardMapper;

	@Autowired
	private RoutineLikesService routineLikesService;

	public Page<RoutineBoard> getRoutinesWithPaging(Pageable pageable) {
		int offset = (int)pageable.getOffset();
		int size = pageable.getPageSize();
		List<RoutineBoard> routines = routineBoardMapper.findAllWithPaging(offset, size);
		long total = routineBoardMapper.countRoutines();
		routines.forEach(routine -> {
			int likes = routineLikesService.getLikesCount(routine.getRoutineId());
			routine.setLikes(likes);
		});
		return new PageImpl<>(routines, pageable, total);
	}

	public Page<RoutineBoard> getRoutinesWithPagingAndSearch(String query, Pageable pageable) {
		int offset = (int)pageable.getOffset();
		int size = pageable.getPageSize();
		List<RoutineBoard> routines = routineBoardMapper.findAllWithPagingAndSearch(offset, size, query);
		long total = routineBoardMapper.countRoutinesWithSearch(query);
		routines.forEach(routine -> {
			int likes = routineLikesService.getLikesCount(routine.getRoutineId());
			routine.setLikes(likes);
		});
		return new PageImpl<>(routines, pageable, total);
	}

	public List<RoutineBoard> getAllRoutines() {
		return routineBoardMapper.findAll();
	}

	public RoutineBoard getRoutineById(Long id) {
		return routineBoardMapper.findById(id);
	}

	public RoutineBoard createRoutineBoard(RoutineBoard routineBoard, Long userId, String nickname) {
		routineBoard.setUserId(userId);
		routineBoard.setNickname(nickname);
		routineBoard.setCreatedAt(LocalDateTime.now());

		try {
			routineBoardMapper.insertRoutineBoard(routineBoard);
		} catch (Exception e) {
			throw e;
		}

		return routineBoard;
	}

	public boolean deleteRoutineById(Long id) {
		try {
			routineBoardMapper.updateIsDeletedById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public RoutineBoard updateRoutine(Long id, RoutineBoard routineBoard) {
		RoutineBoard existingRoutine = routineBoardMapper.findById(id);
		if (existingRoutine == null) {
			return null;
		}

		routineBoard.setRoutineId(id);
		routineBoard.setUpdatedAt(LocalDateTime.now());
		routineBoardMapper.updateRoutineBoard(routineBoard);
		return routineBoard;
	}

	public void incrementViewCount(Long id) {
		routineBoardMapper.incrementViewCount(id);
	}

	public String getGoalNameById(Integer goalId) {
		return routineBoardMapper.findGoalNameById(goalId);
	}

	public String getLevelNameById(Integer levelId) {
		return routineBoardMapper.findLevelNameById(levelId);
	}

	public String getPartNameById(Integer partId) {
		return routineBoardMapper.findPartNameById(partId);
	}

	public long getRoutineCount() {
		return routineBoardMapper.countRoutines();
	}

	public List<RoutineBoard> getBestRoutines(int limit) {
		return routineBoardMapper.findBestRoutines(limit);
	}

	public long getRoutineCountWithSearch(String query) {
		return routineBoardMapper.countRoutinesWithSearch(query);
	}

	public List<RoutineBoard> getRoutinesByUserId(Long userId) {
		return routineBoardMapper.findByUserId(userId);
	}
}
