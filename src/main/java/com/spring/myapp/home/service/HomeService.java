package com.spring.myapp.home.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.home.repository.HomeMapper;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.routineBoard.model.RoutineBoard;

@Service
public class HomeService {
	@Autowired
	private HomeMapper homeMapper;

	public List<Information> getTopInfoList() {
		return homeMapper.findTopInfoList();
	}

	public List<CommunityBoardDTO> getTopCommunityList() {
		return homeMapper.findTopCommunityList();
	}

	public List<RoutineBoard> getTopRoutineList() {
		return homeMapper.findTopRoutineList();
	}

	public List<Product> getTopProductsList(String category) {
		List<Product> productsList;

		if (category.equals("goodsList")) {
			productsList = homeMapper.findTopGoods();
		} else if (category.equals("supplementsList")) {
			productsList = homeMapper.findTopSupplements();
		} else {
			productsList = homeMapper.findTopFoods();
		}

		return productsList;
	}

}
