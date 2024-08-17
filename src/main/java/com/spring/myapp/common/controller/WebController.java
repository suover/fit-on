package com.spring.myapp.common.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 클라이언트 사이드 라우팅을 위한 WebController 클래스입니다.
 * 이 클래스는 클라이언트 요청을 index.html로 라우팅합니다.
 */
@Controller
@Tag(name = "Web Controller", description = "클라이언트 사이드 라우팅을 처리하기 위한 컨트롤러")
public class WebController implements ErrorController {

	/**
	 * 루트 및 에러 페이지 요청을 처리하여 index.html로 리다이렉션합니다.
	 *
	 * @return index.html 파일
	 */
	@Operation(summary = "루트 및 에러 페이지 처리", description = "루트 및 에러 페이지 요청을 처리하여 index.html로 리다이렉션합니다.")
	@GetMapping({"/", "/error"})
	public String index() {
		return "index.html";
	}
}
