package com.spring.myapp.informationBoard.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.myapp.informationBoard.model.InfoPaging;
import com.spring.myapp.informationBoard.model.Information;
import com.spring.myapp.informationBoard.repository.InfoMapper;

@Service
public class InfoService {

	@Autowired
	private InfoMapper infoMapper;

	public List<Information> getAllInfoList() {
		return infoMapper.findAll();
	}

	public Page<Information> infoListPaging(String filterKeyword, String searchKeyword, Pageable pageable) {

		HashMap<String, String> keywords = new HashMap<>();
		keywords.put("filterKeyword", filterKeyword);
		keywords.put("searchKeyword", searchKeyword);

		InfoPaging<?> requestList = InfoPaging.builder().infoData(keywords).pageable(pageable).build();

		List<Information> infoList = infoMapper.keywordInfoList(requestList);
		int total = infoMapper.countKeywordInfoList(keywords);

		return new PageImpl<>(infoList, pageable, total);
	}

	public void writeNewInfo(Information info) {

		Information newInfo = new Information();
		newInfo.setUserId(info.getUserId());
		newInfo.setCategoryId(info.getCategoryId());
		newInfo.setTitle(info.getTitle());
		newInfo.setContent(info.getContent());
		newInfo.setImageUrl(info.getImageUrl());
		newInfo.setUpdatedAt(LocalDateTime.now());
		newInfo.setViewCount(0);

		// 데이터베이스에 저장
		infoMapper.writeNewInfo(newInfo);
	}

	public Information findByInfoId(Long infoId) {
		return infoMapper.findByInfoId(infoId);
	}

	public void updateViewCount(Long infoId) {
		infoMapper.updateViewCount(infoId);
	}

	public void updateInfo(Information info, Long infoId) {

		Information updateData = new Information();
		updateData.setInfoId(infoId);
		updateData.setCategoryId(info.getCategoryId());
		updateData.setTitle(info.getTitle());
		updateData.setContent(info.getContent());
		updateData.setImageUrl(info.getImageUrl());
		updateData.setUpdatedAt(LocalDateTime.now());

		infoMapper.updateInfo(updateData);
	}

	public boolean deleteInfo(Long infoId) {
		int deleteResult = infoMapper.deleteInfo(infoId);
		return deleteResult > 0;
	}

}
