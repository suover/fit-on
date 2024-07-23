package com.spring.myapp.mypage.repository;

import java.util.Date;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.mypage.model.UserInfo;

/**
 * 사용자 정보에 접근하는 매퍼 인터페이스입니다.
 * 이 인터페이스는 MyBatis를 사용하여 데이터베이스와 상호작용합니다.
 */
@Mapper
public interface UserInfoRepository {

	/**
	 * 주어진 사용자 ID로 비밀번호를 조회합니다.
	 *
	 * @param userId 조회할 사용자 ID
	 * @return 사용자의 비밀번호
	 */
	String getPasswordByUserId(@Param("userId") int userId);

	/**
	 * 주어진 사용자 ID로 사용자 정보를 조회합니다.
	 *
	 * @param userId 조회할 사용자 ID
	 * @return 사용자 정보
	 */
	UserInfo getUserInfoById(@Param("userId") int userId);

	/**
	 * 주어진 사용자 ID로 추가 정보가 존재하는지 확인합니다.
	 *
	 * @param userId 조회할 사용자 ID
	 * @return 추가 정보 존재 여부
	 */
	int checkAdditionalInfoExists(@Param("userId") int userId);

	/**
	 * 사용자 기본 정보를 업데이트합니다.
	 *
	 * @param email 이메일
	 * @param name 이름
	 * @param nickname 닉네임
	 * @param phone 핸드폰 번호
	 * @param birthday 생일
	 * @param userId 사용자 ID
	 */
	void updateMainInfo(@Param("email") String email,
		@Param("name") String name,
		@Param("nickname") String nickname,
		@Param("phone") String phone,
		@Param("birthday") Date birthday,
		@Param("userId") int userId);

	/**
	 * 사용자 추가 정보를 업데이트합니다.
	 *
	 * @param gender 성별
	 * @param occupation 직업
	 * @param benchPress 벤치프레스
	 * @param squat 스쿼트
	 * @param deadlift 데드리프트
	 * @param userId 사용자 ID
	 */
	void updateAdditionalInfo(@Param("gender") String gender,
		@Param("occupation") String occupation,
		@Param("benchPress") int benchPress,
		@Param("squat") int squat,
		@Param("deadlift") int deadlift,
		@Param("userId") int userId);

	/**
	 * 사용자 추가 정보를 삽입합니다.
	 *
	 * @param userId 사용자 ID
	 * @param gender 성별
	 * @param occupation 직업
	 * @param benchPress 벤치프레스
	 * @param squat 스쿼트
	 * @param deadlift 데드리프트
	 */
	void insertAdditionalInfo(@Param("userId") int userId,
		@Param("gender") String gender,
		@Param("occupation") String occupation,
		@Param("benchPress") int benchPress,
		@Param("squat") int squat,
		@Param("deadlift") int deadlift);

	/**
	 * 사용자 비밀번호를 업데이트합니다.
	 *
	 * @param userId 사용자 ID
	 * @param password 업데이트할 비밀번호
	 */
	void updatePassword(@Param("userId") int userId, @Param("password") String password);

	/**
	 * 사용자 계정을 비활성화합니다.
	 *
	 * @param userId 비활성화할 사용자 ID
	 */
	void deactivateAccount(@Param("userId") int userId);
}
