package com.spring.myapp.home.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.home.service.HomeService;
import com.spring.myapp.informationBoard.controller.InfoBoardController;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.routineBoard.model.RoutineBoard;

@RequestMapping("api/main")
@RestController
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(InfoBoardController.class);
	@Autowired
	private HomeService homeService;

	@GetMapping("/info")
	public ResponseEntity<?> getInfoList() {
		try {
			List<Information> topInfoList = homeService.getTopInfoList();
			return ResponseEntity.ok(topInfoList);
		} catch (Exception e) {
			logger.error("Error occurred while fetching Main Info list");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/product")
	public ResponseEntity<?> getProductList(@RequestParam(value = "category") String category) {
		try {
			List<Product> topProductList = homeService.getTopProductsList(category);
			return ResponseEntity.ok(topProductList);
		} catch (Exception e) {
			logger.error("Error occurred while fetching Product list");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/community")
	public ResponseEntity<?> getCommunityList() {
		try {
			List<CommunityBoardDTO> topCommunityList = homeService.getTopCommunityList();
			return ResponseEntity.ok(topCommunityList);
		} catch (Exception e) {
			logger.error("Error occurred while fetching Community list");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/routine")
	public ResponseEntity<?> getRoutineList() {
		try {
			List<RoutineBoard> topRoutineList = homeService.getTopRoutineList();
			return ResponseEntity.ok(topRoutineList);
		} catch (Exception e) {
			logger.error("Error occurred while fetching Content list");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
