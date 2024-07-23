package com.spring.myapp.mypage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.myapp.mypage.dto.PasswordUpdateDTO;
import com.spring.myapp.mypage.dto.UserInfoAdditionalUpdateDTO;
import com.spring.myapp.mypage.dto.UserInfoUpdateDTO;
import com.spring.myapp.mypage.model.UserInfo;
import com.spring.myapp.mypage.repository.UserInfoRepository;

/**
 * 사용자 정보와 관련된 비즈니스 로직을 처리하는 서비스 클래스입니다.
 */
@Service
public class UserInfoService {

	@Autowired
	private UserInfoRepository userInfoRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * 주어진 사용자 ID와 비밀번호를 검증합니다.
	 *
	 * @param userId 사용자 ID
	 * @param password 검증할 비밀번호
	 * @return 비밀번호가 올바른지 여부
	 */
	public boolean checkPassword(int userId, String password) {
		String storedPassword = userInfoRepository.getPasswordByUserId(userId);
		return passwordEncoder.matches(password, storedPassword);
	}

	/**
	 * 주어진 사용자 ID로 사용자 정보를 조회합니다.
	 *
	 * @param userId 조회할 사용자 ID
	 * @return 사용자 정보
	 */
	public UserInfo getUserInfo(int userId) {
		return userInfoRepository.getUserInfoById(userId);
	}

	/**
	 * 사용자 기본 정보를 업데이트합니다.
	 *
	 * @param userInfoUpdateDTO 업데이트할 사용자 기본 정보
	 */
	public void updateMainInfo(UserInfoUpdateDTO userInfoUpdateDTO) {
		userInfoRepository.updateMainInfo(userInfoUpdateDTO.getEmail(), userInfoUpdateDTO.getName(),
			userInfoUpdateDTO.getNickname(), userInfoUpdateDTO.getPhone(), userInfoUpdateDTO.getBirthday(),
			userInfoUpdateDTO.getUserId());
	}

	/**
	 * 사용자 추가 정보를 업데이트합니다.
	 *
	 * @param userInfoAdditionalUpdateDTO 업데이트할 사용자 추가 정보
	 */
	public void updateAdditionalInfo(UserInfoAdditionalUpdateDTO userInfoAdditionalUpdateDTO) {
		int exists = userInfoRepository.checkAdditionalInfoExists(userInfoAdditionalUpdateDTO.getUserId());
		if (exists == 0) {
			userInfoRepository.insertAdditionalInfo(userInfoAdditionalUpdateDTO.getUserId(),
				userInfoAdditionalUpdateDTO.getGender(),
				userInfoAdditionalUpdateDTO.getOccupation(), userInfoAdditionalUpdateDTO.getBenchPress(),
				userInfoAdditionalUpdateDTO.getSquat(), userInfoAdditionalUpdateDTO.getDeadlift());
		} else {
			userInfoRepository.updateAdditionalInfo(userInfoAdditionalUpdateDTO.getGender(),
				userInfoAdditionalUpdateDTO.getOccupation(), userInfoAdditionalUpdateDTO.getBenchPress(),
				userInfoAdditionalUpdateDTO.getSquat(), userInfoAdditionalUpdateDTO.getDeadlift(),
				userInfoAdditionalUpdateDTO.getUserId());
		}
	}

	/**
	 * 사용자 비밀번호를 업데이트합니다.
	 *
	 * @param passwordUpdateDTO 업데이트할 비밀번호 정보
	 */
	public void updatePassword(PasswordUpdateDTO passwordUpdateDTO) {
		String encodedPassword = passwordEncoder.encode(passwordUpdateDTO.getNewPassword());
		userInfoRepository.updatePassword(passwordUpdateDTO.getUserId(), encodedPassword);
	}

	/**
	 * 사용자 계정을 비활성화합니다.
	 *
	 * @param userId 비활성화할 사용자 ID
	 */
	public void deactivateAccount(int userId) {
		userInfoRepository.deactivateAccount(userId);
	}
}
