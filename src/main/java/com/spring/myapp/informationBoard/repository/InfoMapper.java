package com.spring.myapp.informationBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.spring.myapp.informationBoard.model.InfoPaging;
import com.spring.myapp.informationBoard.model.Information;

@Mapper
public interface InfoMapper {

	List<Information> findAll();
	
	List<Information> keywordInfoList(InfoPaging<?> infoPaging);

	int countKeywordInfoList(String keyword);

	void writeNewInfo(Information info);

	Information findByInfoId(Long infoId);

	void updateInfo(Information info);

	void updateViewCount(Long infoId);

	int deleteInfo(Long infoId);
}
