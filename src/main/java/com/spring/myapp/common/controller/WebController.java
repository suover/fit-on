package com.spring.myapp.common.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController implements ErrorController {

	@RequestMapping("/error")
	public String handleError() {
		return "forward:/";
	}

	@GetMapping({"/", "/index.html"})
	public String index() {
		return "index.html";
	}
}
