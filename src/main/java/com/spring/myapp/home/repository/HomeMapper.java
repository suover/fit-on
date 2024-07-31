package com.spring.myapp.home.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.spring.myapp.community.dto.CommunityBoardDTO;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.routineBoard.model.RoutineBoard;

@Mapper
public interface HomeMapper {
	List<Information> findTopInfoList();

	List<CommunityBoardDTO> findTopCommunityList();

	List<RoutineBoard> findTopRoutineList();

	List<Product> findTopGoods();

	List<Product> findTopSupplements();

	List<Product> findTopFoods();

}
