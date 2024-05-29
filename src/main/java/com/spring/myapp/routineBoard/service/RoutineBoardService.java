package com.spring.myapp.routineBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.routineBoard.model.RoutineBoard;
import com.spring.myapp.routineBoard.repository.RoutineBoardMapper;

@Service
public class RoutineBoardService {

	@Autowired
	private RoutineBoardMapper routineBoardMapper;

	public List<RoutineBoard> getAllRoutines() {
		return routineBoardMapper.findAll();
	}

	public RoutineBoard getRoutineById(Long id) {
		return routineBoardMapper.findById(id);
	}

	public RoutineBoard createRoutineBoard(RoutineBoard routineBoard) {
		routineBoard.setUserId(30);
		routineBoard.setCreatedAt(LocalDateTime.now());

		try {
			routineBoardMapper.insertRoutineBoard(routineBoard);
		} catch (Exception e) {
			System.out.println("Error inserting routine board: " + e.getMessage());
			throw e;
		}

		return routineBoard;
	}

	public boolean deleteRoutineById(Long id) {
		try {
			routineBoardMapper.updateIsDeletedById(id);
			return true;
		} catch (Exception e) {
			System.out.println("Error updating isDeleted flag: " + e.getMessage());
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

	public List<RoutineBoard> getRoutinesWithPaging(int page, int size) {
		int offset = page * size;
		return routineBoardMapper.findAllWithPaging(offset, size);
	}

	public long getRoutineCount() {
		return routineBoardMapper.countRoutines();
	}

	public List<RoutineBoard> getBestRoutines() {
		return routineBoardMapper.findBestRoutines();
	}

	public List<RoutineBoard> getRoutinesWithPagingAndSearch(int offset, int size, String query) {
		return routineBoardMapper.findAllWithPagingAndSearch(offset, size, query);
	}

	public long getRoutineCountWithSearch(String query) {
		return routineBoardMapper.countRoutinesWithSearch(query);
	}
}
