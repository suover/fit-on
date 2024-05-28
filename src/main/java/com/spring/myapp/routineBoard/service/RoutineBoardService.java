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
		// userId를 30으로 설정
		routineBoard.setUserId(30);
		// 현재 시간 설정
		routineBoard.setCreatedAt(LocalDateTime.now());

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

		// 루틴 게시글 삽입
		try {
			routineBoardMapper.insertRoutineBoard(routineBoard);
		} catch (Exception e) {
			System.out.println("Error inserting routine board: " + e.getMessage());
			throw e;
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
