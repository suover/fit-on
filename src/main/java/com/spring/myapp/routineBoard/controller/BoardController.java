package com.spring.myapp.routineBoard.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.spring.myapp.routineBoard.service.BoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {
	private final BoardService boardService;

	//게시글 작성 화면 띄우기 메서드
	@GetMapping("/new-routine")
	public String newRoutine() {
		return "new-routine";
	}

}
