package com.spring.myapp.routineBoard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ImageUploadController {

	@PostMapping("/upload")
	public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
		// 이미지 파일 처리 로직 추가 (예: 파일 저장 및 URL 반환)
		String imageUrl = "https://example.com/path/to/image.jpg"; // 이미지 저장 후 URL 생성
		return ResponseEntity.ok(imageUrl);
	}
}
