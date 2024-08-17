package com.spring.myapp.mypage.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.myapp.mypage.dto.UserShippingAddressDTO;
import com.spring.myapp.mypage.repository.UserShippingAddressRepository;

/**
 * 배송지 관리 서비스 클래스입니다.
 */
@Service
public class UserShippingAddressService {

	private final UserShippingAddressRepository userShippingAddressRepository;

	@Autowired
	public UserShippingAddressService(UserShippingAddressRepository userShippingAddressRepository) {
		this.userShippingAddressRepository = userShippingAddressRepository;
	}

	/**
	 * 사용자의 모든 배송지를 조회합니다.
	 *
	 * @param userId 사용자 ID
	 * @param pageable 페이지 정보
	 * @return 모든 배송지 리스트
	 */
	public Page<UserShippingAddressDTO> getAllAddresses(int userId, Pageable pageable) {
		List<UserShippingAddressDTO> addresses = userShippingAddressRepository.findAllByUserId(userId, pageable);
		int total = userShippingAddressRepository.countByUserId(userId);
		return new PageImpl<>(addresses, pageable, total);
	}

	/**
	 * 새 배송지 정보를 추가합니다.
	 *
	 * @param addressDto 배송지 정보
	 * @return 추가된 배송지 정보
	 */
	public UserShippingAddressDTO addAddress(UserShippingAddressDTO addressDto) {
		Timestamp currentTime = new Timestamp(System.currentTimeMillis());

		if (addressDto.isDefault()) {
			userShippingAddressRepository.resetDefaultAddress(addressDto.getUserId());
		}

		addressDto.setCreatedAt(currentTime);
		userShippingAddressRepository.insertAddress(addressDto);

		if (addressDto.isDefault()) {
			userShippingAddressRepository.setDefaultAddress(addressDto.getAddressId());
		}

		return addressDto;
	}

	/**
	 * 기존 배송지 정보를 수정합니다.
	 *
	 * @param addressId 배송지 ID
	 * @param addressDto 배송지 정보
	 * @return 수정된 배송지 정보
	 */
	public UserShippingAddressDTO updateAddress(int addressId, UserShippingAddressDTO addressDto) {
		Timestamp currentTime = new Timestamp(System.currentTimeMillis());

		if (addressDto.isDefault()) {
			userShippingAddressRepository.resetDefaultAddress(addressDto.getUserId());
		}

		addressDto.setAddressId(addressId);
		addressDto.setUpdatedAt(currentTime);
		userShippingAddressRepository.updateAddress(addressDto);

		if (addressDto.isDefault()) {
			userShippingAddressRepository.setDefaultAddress(addressDto.getAddressId());
		}

		return addressDto;
	}

	/**
	 * 기존 배송지 정보를 삭제합니다.
	 *
	 * @param addressId 배송지 ID
	 */
	public void deleteAddress(int addressId) {
		userShippingAddressRepository.deleteAddress(addressId);
	}
}
