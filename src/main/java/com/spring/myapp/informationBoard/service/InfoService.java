package com.spring.myapp.informationBoard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.informationBoard.repository.InfoMapper;

@Service
public class InfoService {

	@Autowired
	private InfoMapper infoMapper;

	public List<Information> getAllInfoList() {
		return infoMapper.findAll();
	}

	public void writeNewInfo(Information info) {

		Information newInfo = new Information();
		newInfo.setUserId(36); // 일단 하드코딩
		newInfo.setCategoryId(info.getCategoryId());
		newInfo.setTitle(info.getTitle());
		newInfo.setContent(info.getContent());
		newInfo.setImageUrl(info.getImageUrl());
		newInfo.setUpdatedAt(LocalDateTime.now());

		// 데이터베이스에 저장
		infoMapper.writeNewInfo(newInfo);
	}

	public Information findByInfoId(Long infoId) {
		return infoMapper.findByInfoId(infoId);
	}

	public void updateViewCount(Long infoId) {
		infoMapper.updateViewCount(infoId);
	}
}
