package com.spring.myapp.routineBoard.service;

import java.sql.Timestamp;
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

		// 현재 시간 설정
		Timestamp currentTime = new Timestamp(System.currentTimeMillis());
		routineBoard.setCreatedAt(currentTime);
		routineBoard.setUpdatedAt(currentTime);

		// 로그로 입력된 값들을 출력
		System.out.println("##### RoutineBoard Details #####");
		System.out.println("User ID: " + routineBoard.getUserId());
		System.out.println("Title: " + routineBoard.getTitle());
		System.out.println("Content: " + routineBoard.getContent());
		System.out.println("Goal ID: " + routineBoard.getGoalId());
		System.out.println("Level ID: " + routineBoard.getLevelId());
		System.out.println("Part ID: " + routineBoard.getPartId());
		System.out.println("Created At: " + routineBoard.getCreatedAt());
		System.out.println("Updated At: " + routineBoard.getUpdatedAt());

		// Insert the routine board
		routineBoardMapper.insertRoutineBoard(routineBoard);

		// Insert routine items if available
		if (routineBoard.getRoutineItems() != null && !routineBoard.getRoutineItems().isEmpty()) {
			routineBoardMapper.insertRoutineItems(routineBoard.getRoutineId(), routineBoard.getRoutineItems());
		}

		return routineBoard;
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
}
