package com.spring.myapp.user.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.user.model.User;

/**
 * UserMapper 인터페이스.
 * 사용자 관련 데이터베이스 작업을 처리합니다.
 */
@Mapper
public interface UserMapper {

	/**
	 * 이메일로 사용자를 찾습니다.
	 *
	 * @param email 사용자 이메일
	 * @return User 객체
	 */
	User findByEmail(@Param("email") String email);

	/**
	 * 새로운 사용자를 저장합니다.
	 *
	 * @param user 사용자 객체
	 */
	void save(User user);

	/**
	 * 사용자 역할을 저장합니다.
	 *
	 * @param userId 사용자 ID
	 * @param roleName 역할 이름
	 */
	void saveUserRole(@Param("userId") Long userId, @Param("roleName") String roleName);

	/**
	 * 사용자의 역할 목록을 가져옵니다.
	 *
	 * @param userId 사용자 ID
	 * @return 역할 이름 목록
	 */
	List<String> getUserRoles(@Param("userId") Long userId);

	/**
	 * 이메일이 존재하는지 확인합니다.
	 *
	 * @param email 이메일 주소
	 * @return 이메일 존재 여부
	 */
	boolean existsByEmail(@Param("email") String email);

	/**
	 * 닉네임이 존재하는지 확인합니다.
	 *
	 * @param nickname 닉네임
	 * @return 닉네임 존재 여부
	 */
	boolean existsByNickname(@Param("nickname") String nickname);

	/**
	 * 사용자 ID로 사용자를 찾습니다.
	 *
	 * @param userId 사용자 ID
	 * @return User 객체
	 */
	User findById(@Param("userId") Long userId);
}
