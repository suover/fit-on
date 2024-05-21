package com.spring.myapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.myapp.service.S3Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "File Upload", description = "Operations related to file upload to S3")
public class FileUploadController {

	private final S3Service s3Service;

	public FileUploadController(S3Service s3Service) {
		this.s3Service = s3Service;
	}

	@Operation(summary = "Upload a file to S3")
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
		@RequestParam("folder") String folder) {
		try {
			s3Service.uploadFile(folder, file);
			return ResponseEntity.ok("File uploaded successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
		}
	}
}