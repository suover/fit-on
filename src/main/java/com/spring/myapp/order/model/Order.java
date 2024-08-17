package com.spring.myapp.order.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class Order {
    private Long orderId; // 주문 번호
    private Long userId; // 상품 주문 유저 아이디
    private Date orderDate; // 주문 시간
    private Integer statusId; // 주문 상태
    private BigDecimal total;
    private BigDecimal shippingFee;
}
