package com.spring.myapp.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.myapp.user.model.User;
import com.spring.myapp.user.repository.UserMapper;

/**
 * 사용자 상세 정보 서비스 구현 클래스.
 * 사용자의 인증 및 권한 부여를 처리합니다.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserMapper userMapper;

	/**
	 * 사용자 이름(이메일)으로 사용자를 로드합니다.
	 *
	 * @param email 사용자 이메일
	 * @return UserDetails 객체
	 * @throws UsernameNotFoundException 사용자를 찾을 수 없는 경우 예외 발생
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userMapper.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}

		List<String> roles = userMapper.getUserRoles(user.getUserId());

		return org.springframework.security.core.userdetails.User
			.withUsername(user.getEmail())
			.password(user.getPassword())
			.roles(roles.toArray(new String[0]))
			.build();
	}
}
