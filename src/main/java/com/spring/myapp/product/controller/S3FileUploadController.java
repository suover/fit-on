package com.spring.myapp.product.controller;

import com.spring.myapp.product.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
@RestController
@RequestMapping("/upload")
public class S3FileUploadController {
	private final S3Service s3Service;

	@Autowired
	public S3FileUploadController(S3Service s3Service) {
		this.s3Service = s3Service;
	}

	@PostMapping
	public Map<String, String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("folder") String folder) {
		try {
			String imageUrl = s3Service.uploadFile(file, folder);
			return Collections.singletonMap("imageUrl", imageUrl);
		} catch (IOException e) {
			e.printStackTrace();
			return Collections.singletonMap("error", "File upload failed");
		}
	}

}
