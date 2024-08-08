package com.spring.myapp.mypage.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * UserShippingAddressDTO는 배송지 관리를 위한 데이터 전송 객체입니다.
 */
@Getter
@Setter
@Accessors(chain = true)
public class UserShippingAddressDTO {
	private int addressId;
	private int userId;
	private String recipientName;
	private String contact;
	private String postcode;
	private String address;
	private String addressDetail;
	private String addressName;
	@JsonProperty("isDefault")
	private boolean isDefault;
	private Timestamp createdAt;
	private Timestamp updatedAt;
}