package com.spring.myapp.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.mypage.model.MyHomeStatistics;
import com.spring.myapp.mypage.service.MyHomeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * MyHome 관련 요청을 처리하는 컨트롤러입니다.
 *
 * 이 컨트롤러는 MyHome 페이지를 위한 엔드포인트를 제공합니다.
 */
@RestController
@RequestMapping("/api/mypage/myhome")
@Tag(name = "MyHome", description = "MyHome 기능 관련 API")
public class MyHomeController {

	@Autowired
	private MyHomeService myHomeService;

	/**
	 * 주어진 사용자 ID에 대한 글 작성 수, 댓글 수, 좋아요 수를 조회합니다.
	 *
	 * @param userId 조회할 사용자의 ID
	 * @return MyHomeStatistics 객체, 글 작성 수, 댓글 수, 좋아요 수 정보를 포함
	 * @throws RuntimeException 통계 조회 중 문제가 발생한 경우
	 *
	 * @see MyHomeStatistics
	 */
	@Operation(summary = "사용자 통계 조회", description = "사용자 ID를 통해 글 작성 수, 댓글 수, 좋아요 수를 조회합니다.")
	@GetMapping("/statistics/{userId}")
	public MyHomeStatistics getUserStatistics(
		@Parameter(description = "통계를 조회할 사용자의 ID", required = true)
		@PathVariable("userId") Long userId) {
		return myHomeService.getUserStatistics(userId);
	}
}
