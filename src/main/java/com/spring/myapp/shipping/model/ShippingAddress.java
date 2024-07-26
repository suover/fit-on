package com.spring.myapp.shipping.model;

import lombok.Data;

import java.util.Date;

@Data
public class ShippingAddress {
    private Long addressId;
    private Long userId;
    private String recipientName; // 수령자 이름
    private String contact; //
    private String postcode; // 우편번호
    private String address; // 주소
    private String addressDetail; // 상세주소
    private String addressName; // 사용자 지정 주소명칭
    private Boolean isDefault; 
    private Date createdAt;
    private Date updatedAt;
}
