package com.spring.myapp.informationBoard.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.spring.myapp.informationBoard.model.Information;

@Mapper
public interface InformationMapper {

	List<Information> findAll();

	void writeNewInfo(Information info);
}
