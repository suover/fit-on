package com.spring.myapp.mypage.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
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

	@Autowired
	private AmazonS3Client amazonS3Client;

	private static final String BUCKET_NAME = "fiton-bucket";
	private static final String PROFILE_IMAGE_DIR = "user-additional-info/";

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

	/**
	 * 사용자 프로필 이미지를 업로드하거나 삭제합니다.
	 *
	 * @param userId 사용자 ID
	 * @param file 업로드할 파일 (삭제 시 비어 있음)
	 * @return 업로드된 프로필 이미지 URL 또는 null
	 */
	public String handleProfileImage(int userId, MultipartFile file) {
		UserInfo userInfo = userInfoRepository.getUserInfoById(userId);

		// 추가 정보가 없는 경우 삽입
		int exists = userInfoRepository.checkAdditionalInfoExists(userId);
		if (exists == 0) {
			userInfoRepository.insertAdditionalInfo(userId, null, null, 0, 0, 0);
		}

		// 기존 이미지 삭제
		if (userInfo.getProfilePictureUrl() != null && !userInfo.getProfilePictureUrl().isEmpty()) {
			deleteProfileImage(userInfo.getProfilePictureUrl());
		}

		if (file == null || file.isEmpty()) {
			// 이미지 삭제 요청인 경우
			userInfoRepository.updateProfilePictureUrl(userId, null);
			return null;
		} else {
			// 이미지 업로드 요청인 경우
			String newImageUrl = uploadProfileImage(file);
			userInfoRepository.updateProfilePictureUrl(userId, newImageUrl);
			return newImageUrl;
		}
	}

	/**
	 * 프로필 이미지를 S3에 업로드합니다.
	 *
	 * @param file 업로드할 파일
	 * @return 업로드된 이미지의 URL
	 */
	private String uploadProfileImage(MultipartFile file) {
		String fileName = PROFILE_IMAGE_DIR + UUID.randomUUID() + "-" + file.getOriginalFilename();
		try {
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType(file.getContentType());
			amazonS3Client.putObject(BUCKET_NAME, fileName, file.getInputStream(), metadata);
		} catch (IOException e) {
			throw new RuntimeException("프로필 이미지 업로드 실패", e);
		}
		return amazonS3Client.getUrl(BUCKET_NAME, fileName).toString();
	}

	/**
	 * S3에서 프로필 이미지를 삭제합니다.
	 *
	 * @param imageUrl 삭제할 이미지의 URL
	 */
	private void deleteProfileImage(String imageUrl) {
		String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
		amazonS3Client.deleteObject(BUCKET_NAME, PROFILE_IMAGE_DIR + fileName);
	}

	/**
	 * 사용자 프로필 이미지 URL을 가져옵니다.
	 *
	 * @param userId 사용자 ID
	 * @return 프로필 이미지 URL 또는 null
	 */
	public String getProfileImageUrl(int userId) {
		UserInfo userInfo = userInfoRepository.getUserInfoById(userId);
		return userInfo.getProfilePictureUrl();
	}
}
