package com.spring.myapp.mypage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.myapp.mypage.dto.DeactivateAccountDTO;
import com.spring.myapp.mypage.dto.PasswordUpdateDTO;
import com.spring.myapp.mypage.dto.UserInfoAdditionalUpdateDTO;
import com.spring.myapp.mypage.dto.UserInfoUpdateDTO;
import com.spring.myapp.mypage.model.UserInfo;
import com.spring.myapp.mypage.service.UserInfoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * UserInfo 관련 요청을 처리하는 컨트롤러입니다.
 * 이 컨트롤러는 UserInfo 페이지를 위한 엔드포인트를 제공합니다.
 */
@RestController
@RequestMapping("/api/mypage/userinfo")
@Tag(name = "UserInfo", description = "UserInfo 기능 관련 API")
public class UserInfoController {

	@Autowired
	private UserInfoService userInfoService;

	/**
	 * 주어진 사용자 ID와 비밀번호를 검증합니다.
	 *
	 * @param userInfo 검증할 사용자 정보 (ID와 비밀번호 포함)
	 * @return 비밀번호가 올바른지 여부를 나타내는 Boolean 값
	 */
	@Operation(summary = "비밀번호 검증", description = "사용자 ID와 비밀번호를 통해 비밀번호를 검증합니다.")
	@PostMapping("/check-password")
	public ResponseEntity<Boolean> checkPassword(
		@Parameter(description = "검증할 사용자 정보", required = true)
		@RequestBody UserInfo userInfo) {
		boolean isPasswordCorrect = userInfoService.checkPassword(userInfo.getUserId(), userInfo.getPassword());
		return ResponseEntity.ok(isPasswordCorrect);
	}

	/**
	 * 주어진 사용자 ID로 사용자 정보를 조회합니다.
	 *
	 * @param userId 조회할 사용자 ID
	 * @return 사용자 정보
	 */
	@Operation(summary = "사용자 정보 조회", description = "사용자 ID를 통해 사용자 정보를 조회합니다.")
	@GetMapping("/get-user-info")
	public ResponseEntity<UserInfo> getUserInfo(
		@Parameter(description = "조회할 사용자 ID", required = true)
		@RequestParam(name = "userId") int userId) {
		UserInfo userInfo = userInfoService.getUserInfo(userId);
		return ResponseEntity.ok(userInfo);
	}

	/**
	 * 주어진 사용자 ID로 기본 정보를 업데이트합니다.
	 *
	 * @param userInfoUpdateDTO 업데이트할 사용자 기본 정보
	 * @return 업데이트된 사용자 기본 정보
	 */
	@Operation(summary = "기본 정보 업데이트", description = "사용자 ID를 통해 기본 정보를 업데이트합니다.")
	@PutMapping("/update-main-info")
	public ResponseEntity<Void> updateMainInfo(
		@Parameter(description = "업데이트할 사용자 정보", required = true)
		@Valid @RequestBody UserInfoUpdateDTO userInfoUpdateDTO) {
		userInfoService.updateMainInfo(userInfoUpdateDTO);
		return ResponseEntity.ok().build();
	}

	/**
	 * 주어진 사용자 ID로 추가 정보를 업데이트합니다.
	 *
	 * @param userInfoAdditionalUpdateDTO 업데이트할 추가 정보
	 * @return 업데이트된 추가 정보
	 */
	@Operation(summary = "추가 정보 업데이트", description = "사용자 ID를 통해 추가 정보를 업데이트합니다.")
	@PutMapping("/update-additional-info")
	public ResponseEntity<Void> updateAdditionalInfo(
		@Parameter(description = "업데이트할 추가 정보", required = true)
		@Valid @RequestBody UserInfoAdditionalUpdateDTO userInfoAdditionalUpdateDTO) {
		userInfoService.updateAdditionalInfo(userInfoAdditionalUpdateDTO);
		return ResponseEntity.ok().build();
	}

	/**
	 * 주어진 사용자 ID로 비밀번호를 업데이트합니다.
	 *
	 * @param passwordUpdateDTO 업데이트할 비밀번호 정보
	 * @return 업데이트 성공 여부를 나타내는 Boolean 값
	 */
	@Operation(summary = "비밀번호 업데이트", description = "사용자 ID를 통해 비밀번호를 업데이트합니다.")
	@PutMapping("/update-password")
	public ResponseEntity<Void> updatePassword(
		@Parameter(description = "업데이트할 비밀번호 정보", required = true)
		@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO) {
		userInfoService.updatePassword(passwordUpdateDTO);
		return ResponseEntity.ok().build();
	}

	/**
	 * 계정을 비활성화합니다.
	 *
	 * @param deactivateAccountDTO 계정 비활성화 정보
	 * @return 비활성화된 계정 정보
	 */
	@Operation(summary = "계정 비활성화", description = "계정을 비활성화합니다.")
	@PutMapping("/deactivate-account")
	public ResponseEntity<Void> deactivateAccount(
		@Parameter(description = "계정 비활성화 정보", required = true)
		@Valid @RequestBody DeactivateAccountDTO deactivateAccountDTO) {
		userInfoService.deactivateAccount(deactivateAccountDTO.getUserId());
		return ResponseEntity.ok().build();
	}
}
