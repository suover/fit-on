package com.spring.myapp.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.myapp.user.model.User;
import com.spring.myapp.user.repository.UserMapper;

/**
 * 사용자 서비스 클래스.
 * 사용자 관련 비즈니스 로직을 처리합니다.
 */
@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * 새로운 사용자를 등록합니다.
	 *
	 * @param user 사용자 객체
	 */
	@Transactional
	public void register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userMapper.save(user);

		// 기본 권한 "USER"
		userMapper.saveUserRole(user.getUserId(), "USER");
	}

	/**
	 * 이메일 중복 여부를 확인합니다.
	 *
	 * @param email 이메일 주소
	 * @return 이메일 중복 여부
	 */
	public boolean isEmailDuplicate(String email) {
		return userMapper.existsByEmail(email);
	}

	/**
	 * 닉네임 중복 여부를 확인합니다.
	 *
	 * @param nickname 닉네임
	 * @return 닉네임 중복 여부
	 */
	public boolean isNicknameDuplicate(String nickname) {
		return userMapper.existsByNickname(nickname);
	}

	/**
	 * 사용자 역할 목록을 가져옵니다.
	 *
	 * @param userId 사용자 ID
	 * @return 역할 목록
	 */
	public List<String> getUserRoles(Long userId) {
		return userMapper.getUserRoles(userId);
	}

	/**
	 * 이메일로 사용자를 찾습니다.
	 *
	 * @param email 이메일 주소
	 * @return 사용자 객체
	 */
	public User findByEmail(String email) {
		return userMapper.findByEmail(email);
	}
}
