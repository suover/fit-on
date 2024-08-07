package com.spring.myapp.informationBoard.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	@GetMapping("/info") // 전체 목록 조회
	public ResponseEntity<List<Information>> getAllInfoList() {
		List<Information> infoList = infoService.getAllInfoList();
		return new ResponseEntity<>(infoList, HttpStatus.OK);
	}

	@GetMapping("/info/search")// 카테고리 이름 넘기고 카테고리 이름에서 카테고리 번호 조회 -> 번호가 같은 글 조회하는 방식
	public ResponseEntity<?> getInfoList(
		@RequestParam(value = "filterKeyword") String filterKeyword,
		@RequestParam(value = "searchKeyword", required = false, defaultValue = "") String searchKeyword,
		@PageableDefault(page = 0, size = 12, sort = "created_at", direction = Sort.Direction.DESC) Pageable pageable) {

		try {
			logger.info("Keyword received: {}", filterKeyword);
			Page<?> paging = infoService.infoListPaging(filterKeyword, searchKeyword, pageable);
			logger.info("result : {}", paging);
			return new ResponseEntity<>(paging, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error occurred while fetching information list for keyword: {}", filterKeyword, e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/newInfo") // 새 정보글 등록
	public ResponseEntity<?> newInfoPost(@RequestPart("information") String informationStr,
		@RequestPart("file") MultipartFile file) throws IOException {

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

	@PutMapping("/info/update/{infoId}") // 새 정보글 수정
	public ResponseEntity<?> updateInfoPost(@RequestPart("information") String informationStr,
		@RequestPart(value = "file", required = false) MultipartFile file,
		@RequestPart(value = "existingImageUrl", required = false) String existingImageUrl,
		@PathVariable("infoId") Long infoId) throws IOException {

		Information info = objectMapper.readValue(informationStr, Information.class); // json으로 받은 데이터 객체화

		try {
			logger.info("Received information post request: {}", info);

			System.out.println(existingImageUrl);

			if (file != null && !file.isEmpty()) {
				String imageUrl = saveImage(file);
				info.setImageUrl(imageUrl);
			} else {
				info.setImageUrl(existingImageUrl);
			}

			infoService.updateInfo(info, infoId);

			return ResponseEntity.ok("Information update successfully");

		} catch (Exception e) {
			logger.error("Error while processing information update", e);
			return ResponseEntity.status(500).body("Error while processing information update");
		}
	}

	private String saveImage(MultipartFile file) throws IOException {
		String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		s3Service.uploadFile("info", filename, file);
		return s3Service.getFileUrl("info", filename);
	}

	@GetMapping("/info/{infoId}") // 정보글 디테일 조회
	public ResponseEntity<Information> getInfoById(@PathVariable("infoId") Long infoId) {
		Information infoDetail = infoService.findByInfoId(infoId);
		infoService.updateViewCount(infoId); // 조회수 증가
		return new ResponseEntity<>(infoDetail, HttpStatus.OK);
	}

	@PutMapping("/info/delete/{infoId}") // 정보글 삭제, 해당 글에 등록된 댓글 삭제
	public ResponseEntity<?> deleteInfo(@PathVariable("infoId") Long infoId) {
		try {
			boolean isDeleted = infoService.deleteInfo(infoId);

			if (isDeleted) {
				logger.info("Info with ID {} marked as deleted.", infoId);
				return ResponseEntity.ok("Info deleted successfully");
			} else {
				logger.warn("Info with ID {} not found.", infoId);
				return ResponseEntity.status(404).body("Info not found");
			}

		} catch (Exception e) {
			logger.error("Error deleting info with ID {}", infoId, e);
			return ResponseEntity.status(500).body("Error deleting info");
		}
	}

	@PutMapping("/info/{infoId}/like") // 좋아요 처리
	public ResponseEntity<?> likePost(@PathVariable("infoId") Long infoId,
		@RequestParam("userId") Long userId) {

		try {
			boolean isLiked = infoLikesService.toggleLike(infoId, userId);
			if (isLiked) {
				logger.info("User {} liked info {}", userId, infoId);
				return ResponseEntity.ok("Liked");
			} else {
				logger.info("User {} unliked info {}", userId, infoId);
				return ResponseEntity.ok("Unliked");
			}
		} catch (Exception e) {
			logger.error("Error toggling like for info {} by user {}", infoId, userId, e);
			return ResponseEntity.status(500).body("Error toggling like");
		}
	}

}
