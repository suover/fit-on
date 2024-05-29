package com.spring.myapp.community.repository;

import com.spring.myapp.user.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CommunityBoardUserRepository {
		@Select("SELECT * FROM users WHERE email = #{email}")
		User findByEmail(String email);
}