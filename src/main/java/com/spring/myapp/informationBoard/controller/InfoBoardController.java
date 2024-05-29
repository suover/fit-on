package com.spring.myapp.informationBoard.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.informationBoard.service.InfoLikesService;
import com.spring.myapp.informationBoard.service.InfoS3Service;
import com.spring.myapp.informationBoard.service.InfoService;

@RequestMapping("api")
@RestController
public class InfoBoardController {

	private static final Logger logger = LoggerFactory.getLogger(InfoBoardController.class);

	@Autowired
	private InfoService infoService;

	@Autowired
	private InfoS3Service s3Service;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private InfoLikesService infoLikesService;

	@GetMapping("/info")
	public ResponseEntity<List<Information>> getAllInfoList() { // 전체 목록 조회. 페이징, 필터기능 포함해야함!
		List<Information> infoList = infoService.getAllInfoList();

		System.out.println("---------------------------");
		System.out.println(infoList.get(1));
		System.out.println("---------------------------");

		return new ResponseEntity<>(infoList, HttpStatus.OK);
	}

	@PostMapping("/newInfo")
	public ResponseEntity<?> newInfoPost(@RequestPart("information") String informationStr,
		@RequestPart("file") MultipartFile file) throws IOException { // 새 정보글 등록

		Information info = objectMapper.readValue(informationStr, Information.class); // json으로 받은 데이터 객체화

		try {
			logger.info("Received new information post request: {}", info);

			String imageUrl = saveImage(file);
			info.setImageUrl(imageUrl);

			infoService.writeNewInfo(info);

			return ResponseEntity.ok("Information added successfully");

		} catch (Exception e) {
			logger.error("Error while processing new information post", e);
			return ResponseEntity.status(500).body("Error while processing new information post");
		}
	}

	private String saveImage(MultipartFile file) throws IOException {
		String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		s3Service.uploadFile("info", filename, file);
		return s3Service.getFileUrl("info", filename);
	}

	@GetMapping("/info/{infoId}")
	public ResponseEntity<Information> getInfoById(@PathVariable("infoId") Long infoId) { // 정보글 디테일 조회
		Information infoDetail = infoService.findByInfoId(infoId);
		infoService.updateViewCount(infoId);
		return new ResponseEntity<>(infoDetail, HttpStatus.OK);
	}

	@GetMapping("/info/{infoId}/like")
	public ResponseEntity<Map<String, Object>> likePost(@RequestParam("infoId") Long infoId,
		@RequestParam("userId") Long userId) { // 좋아요 처리

		Map<String, Object> response = new HashMap<>();

		try {
			boolean success = infoLikesService.toggleLike(infoId, userId);
			Integer totalLikes = infoLikesService.countLikes(infoId);
			response.put("success", success);
			response.put("likesCount", totalLikes);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body(null);
		}
	}

}
