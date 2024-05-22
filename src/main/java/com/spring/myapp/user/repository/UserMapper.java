package com.spring.myapp.user.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.user.model.User;

@Mapper
public interface UserMapper {
	User findByEmail(@Param("email") String email);

	void save(User user);

	void saveUserRole(@Param("userId") Long userId, @Param("roleName") String roleName);

	List<String> getUserRoles(@Param("userId") Long userId);

	boolean existsByEmail(@Param("email") String email);

	boolean existsByNickname(@Param("nickname") String nickname);
}