package com.spring.myapp.informationBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.spring.myapp.informationBoard.model.Information;

@Mapper
public interface InfoMapper {

	List<Information> findAll();

	void writeNewInfo(Information info);

	Information findByInfoId(Long infoId);

	void updateViewCount(Long infoId);
}
