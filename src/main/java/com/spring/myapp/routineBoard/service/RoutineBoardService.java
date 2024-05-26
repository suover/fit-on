package com.spring.myapp.routineBoard.service;

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
		routineBoardMapper.insertRoutineBoard(routineBoard);
		if (routineBoard.getRoutineItems() != null && !routineBoard.getRoutineItems().isEmpty()) {
			routineBoardMapper.insertRoutineItems(routineBoard.getRoutineId(), routineBoard.getRoutineItems());
		}
		return routineBoard;
	}

}
