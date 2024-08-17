package com.spring.myapp.user.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.spring.myapp.user.model.UserSocialLogin;

/**
 * UserSocialLoginMapper 인터페이스.
 * 소셜 로그인 사용자 관련 데이터베이스 작업을 처리합니다.
 */
@Mapper
public interface UserSocialLoginMapper {

	/**
	 * 소셜 로그인 제공자와 제공자 ID로 사용자를 찾습니다.
	 *
	 * @param provider 소셜 로그인 제공자
	 * @param providerId 제공자 ID
	 * @return UserSocialLogin 객체
	 */
	UserSocialLogin findByProviderAndProviderId(@Param("provider") String provider,
		@Param("providerId") String providerId);

	/**
	 * 새로운 소셜 로그인 사용자 정보를 저장합니다.
	 *
	 * @param userSocialLogin UserSocialLogin 객체
	 */
	void save(UserSocialLogin userSocialLogin);
}
