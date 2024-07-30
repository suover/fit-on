package com.spring.myapp.home.dto;

import java.util.HashMap;
import java.util.List;

import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.routineBoard.model.RoutineBoard;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomeDTO { // 메인 페이지로 데이터를 전송하기 위한 클래스
	private List<Information> infoList;

	private HashMap<String, List<Product>> productList;

	private List<CommunityBoardDTO> communityList;

	private List<RoutineBoard> routineList;
}
