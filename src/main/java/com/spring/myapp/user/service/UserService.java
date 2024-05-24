package com.spring.myapp.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.myapp.user.model.User;
import com.spring.myapp.user.repository.UserMapper;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	public void register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userMapper.save(user);

		// 기본 권한 "USER"
		userMapper.saveUserRole(user.getUserId(), "USER");
	}

	public boolean isEmailDuplicate(String email) {
		return userMapper.existsByEmail(email);
	}

	public boolean isNicknameDuplicate(String nickname) {
		return userMapper.existsByNickname(nickname);
	}

	public List<String> getUserRoles(Long userId) {
		return userMapper.getUserRoles(userId);
	}

	public User findByEmail(String email) {
		return userMapper.findByEmail(email);
	}
}
