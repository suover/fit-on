package com.spring.myapp.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.mypage.dto.UserShippingAddressDTO;
import com.spring.myapp.mypage.service.UserShippingAddressService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * UserShippingAddress 관련 요청을 처리하는 컨트롤러입니다.
 * 이 컨트롤러는 마이페이지의 배송지 관리 페이지를 위한 엔드포인트를 제공합니다.
 */
@RestController
@RequestMapping("/api/mypage/shipping-addresses")
@Tag(name = "UserShippingAddress", description = "User ShippingAddress 기능 관련 API")
public class UserShippingAddressController {

	private final UserShippingAddressService userShippingAddressService;

	@Autowired
	public UserShippingAddressController(UserShippingAddressService userShippingAddressService) {
		this.userShippingAddressService = userShippingAddressService;
	}

	/**
	 * 모든 배송지 조회
	 *
	 * @param userId 사용자 ID
	 * @param page   페이지 번호
	 * @param size   페이지 크기
	 * @return 페이징된 배송지 리스트
	 */
	@Operation(summary = "모든 배송지 조회", description = "사용자의 모든 배송지를 조회합니다.")
	@GetMapping
	public ResponseEntity<Page<UserShippingAddressDTO>> getAllAddresses(
		@Parameter(description = "사용자 ID", required = true) @RequestParam("userId") int userId,
		@Parameter(description = "페이지 번호", required = true) @RequestParam("page") int page,
		@Parameter(description = "페이지 크기", required = true) @RequestParam("size") int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<UserShippingAddressDTO> addresses = userShippingAddressService.getAllAddresses(userId, pageable);
		return ResponseEntity.ok(addresses);
	}

	/**
	 * 배송지 추가
	 *
	 * @param addressDto 배송지 정보
	 * @return 추가된 배송지 정보
	 */
	@Operation(summary = "배송지 추가", description = "새 배송지 정보를 추가합니다.")
	@PostMapping
	public ResponseEntity<UserShippingAddressDTO> addAddress(
		@Parameter(description = "배송지 정보", required = true) @RequestBody UserShippingAddressDTO addressDto) {
		UserShippingAddressDTO newAddress = userShippingAddressService.addAddress(addressDto);
		return ResponseEntity.ok(newAddress);
	}

	/**
	 * 배송지 수정
	 *
	 * @param addressId 배송지 ID
	 * @param addressDto 배송지 정보
	 * @return 수정된 배송지 정보
	 */
	@Operation(summary = "배송지 수정", description = "기존 배송지 정보를 수정합니다.")
	@PutMapping("/{addressId}")
	public ResponseEntity<UserShippingAddressDTO> updateAddress(
		@Parameter(description = "배송지 ID", required = true) @PathVariable("addressId") int addressId,
		@Parameter(description = "배송지 정보", required = true) @RequestBody UserShippingAddressDTO addressDto) {
		UserShippingAddressDTO updatedAddress = userShippingAddressService.updateAddress(addressId, addressDto);
		return ResponseEntity.ok(updatedAddress);
	}

	/**
	 * 배송지 삭제
	 *
	 * @param addressId 배송지 ID
	 * @return 삭제 상태
	 */
	@Operation(summary = "배송지 삭제", description = "기존 배송지 정보를 삭제합니다.")
	@DeleteMapping("/{addressId}")
	public ResponseEntity<Void> deleteAddress(
		@Parameter(description = "배송지 ID", required = true) @PathVariable("addressId") int addressId) {
		userShippingAddressService.deleteAddress(addressId);
		return ResponseEntity.noContent().build();
	}
}
