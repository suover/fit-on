package com.spring.myapp.informationBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.informationBoard.repository.InformationMapper;

@Service
public class InformationService {

	@Autowired
	private InformationMapper informationMapper;

	public List<Information> getAllInfoList() {
		return informationMapper.findAll();
	}

	public void writeNewInfo(Information info) {

		Information newInfo = new Information();
		newInfo.setUserId(36); // 일단 하드코딩
		newInfo.setCategoryId(info.getCategoryId());
		newInfo.setTitle(info.getTitle());
		newInfo.setContent(info.getContent());
		newInfo.setImageUrl(info.getImageUrl());
		newInfo.setUpdatedAt(LocalDateTime.now());
		newInfo.setViewCount(1);

		// 데이터베이스에 저장
		informationMapper.writeNewInfo(newInfo);
	}

	//
	// public void getInfoById(Long infoId) {
	// 	// 상세글 조회
	// }
}
