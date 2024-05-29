package com.spring.myapp.community.service;


import java.util.Collections;

import com.spring.myapp.community.model.CommunityBoardUserDetails;
import com.spring.myapp.community.repository.CommunityBoardUserRepository;
import com.spring.myapp.user.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Primary
public class CommunityBoardUserDetailsService implements UserDetailsService {

		@Autowired
		private CommunityBoardUserRepository communityBoardUserRepository;

		@Override
		public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
				User user = communityBoardUserRepository.findByEmail(email);
				if (user == null) {
						throw new UsernameNotFoundException("User not found with email: " + email);
				}
				return new CommunityBoardUserDetails(user.getUserId(), user.getEmail(), user.getPassword(), Collections.emptyList());
		}
}