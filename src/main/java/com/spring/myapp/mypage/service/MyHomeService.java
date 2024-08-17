package com.spring.myapp.mypage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.mypage.model.MyHomeStatistics;
import com.spring.myapp.mypage.repository.MyHomeRepository;

/**
 * MyHome 페이지와 관련된 비즈니스 로직을 처리하는 서비스 클래스입니다.
 */
@Service
public class MyHomeService {

	@Autowired
	private MyHomeRepository myHomeRepository;

	/**
	 * 주어진 사용자 ID에 대한 글 작성 수, 댓글 수, 좋아요 수를 조회합니다.
	 * 이 메서드는 MyHomeRepository를 사용하여 데이터베이스에서 데이터를 가져옵니다.
	 *
	 * @param userId 조회할 사용자의 ID
	 * @return MyHomeStatistics 객체, 사용자의 글 작성 수, 댓글 수, 좋아요 수 정보를 포함
	 */
	public MyHomeStatistics getUserStatistics(Long userId) {
		return myHomeRepository.getUserStatistics(userId);
	}
}
