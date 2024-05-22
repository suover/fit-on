package com.spring.myapp.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.myapp.user.model.User;
import com.spring.myapp.user.repository.UserMapper;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserMapper userMapper;

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
