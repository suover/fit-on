package com.spring.myapp.routineBoard.service;

import org.springframework.stereotype.Service;

import com.spring.myapp.routineBoard.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;
}
