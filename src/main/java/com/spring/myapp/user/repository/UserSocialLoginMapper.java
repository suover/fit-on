package com.spring.myapp.user.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.user.model.UserSocialLogin;

@Mapper
public interface UserSocialLoginMapper {
	UserSocialLogin findByProviderAndProviderId(@Param("provider") String provider,
		@Param("providerId") String providerId);

	void save(UserSocialLogin userSocialLogin);
}
