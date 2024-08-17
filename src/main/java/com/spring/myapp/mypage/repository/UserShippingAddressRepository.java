package com.spring.myapp.mypage.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;

import com.spring.myapp.mypage.dto.UserShippingAddressDTO;

/**
 * 배송지 관리 관련 매퍼
 */
@Mapper
public interface UserShippingAddressRepository {

	/**
	 * 사용자 ID를 기반으로 모든 배송지 조회
	 *
	 * @param userId 사용자 ID
	 * @param pageable 페이지네이션 정보
	 * @return 배송지 리스트
	 */
	List<UserShippingAddressDTO> findAllByUserId(@Param("userId") int userId, @Param("pageable") Pageable pageable);

	/**
	 * 사용자 ID를 기반으로 총 배송지 수 조회
	 *
	 * @param userId 사용자 ID
	 * @return 총 배송지 수
	 */
	int countByUserId(@Param("userId") int userId);

	/**
	 * 새 배송지 정보 삽입
	 *
	 * @param addressDto 배송지 정보
	 */
	void insertAddress(UserShippingAddressDTO addressDto);

	/**
	 * 기존 배송지 정보 수정
	 *
	 * @param addressDto 배송지 정보
	 */
	void updateAddress(UserShippingAddressDTO addressDto);

	/**
	 * 기본 배송지 리셋
	 *
	 * @param userId 사용자 ID
	 */
	void resetDefaultAddress(int userId);

	/**
	 * 기본 배송지 설정
	 *
	 * @param addressId 배송지 ID
	 */
	void setDefaultAddress(@Param("addressId") int addressId);

	/**
	 * 기존 배송지 정보 삭제
	 *
	 * @param addressId 배송지 ID
	 */
	void deleteAddress(int addressId);
}
