package com.spring.myapp.informationBoard.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.informationBoard.service.InfoS3Service;
import com.spring.myapp.informationBoard.service.InformationService;

@RequestMapping("api")
@RestController
public class InformationBoardController {

	private static final Logger logger = LoggerFactory.getLogger(InformationBoardController.class);
	@Autowired
	private InformationService informationService;

	@Autowired
	private InfoS3Service s3Service;

	@Autowired
	private ObjectMapper objectMapper;

	@GetMapping("/info")
	public ResponseEntity<List<Information>> getAllInfoList() { // 전체 목록 조회. 페이징, 필터기능 포함해야함!
		List<Information> infoList = informationService.getAllInfoList();
		return new ResponseEntity<>(infoList, HttpStatus.OK);
	}

	@PostMapping("/newInfo")
	public void newInfoPost(@RequestPart("information") String informationStr,
		@RequestPart("file") MultipartFile file) throws IOException { // 새 정보글 등록

		Information info = objectMapper.readValue(informationStr, Information.class); // json으로 받은 데이터 객체화

		try {
			logger.info("Received new information post request: {}", info);

			String imageUrl = saveImage(file);
			info.setImageUrl(imageUrl);

			System.out.println("-------------------");
			System.out.println(info);
			System.out.println("-------------------");

			informationService.writeNewInfo(info);

		} catch (Exception e) {
			logger.error("Error while processing new information post", e);
			throw new RuntimeException("Error while processing new information post", e);
		}
	}

	private String saveImage(MultipartFile file) throws IOException {
		String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		s3Service.uploadFile("info", filename, file);
		return s3Service.getFileUrl("info", filename);
	}

	// @GetMapping("/info/{infoId}")
	// public void getInfoById(@PathVariable Long infoId) {
	// 	// 디테일 조회 컨트롤
	// }
	//
}
