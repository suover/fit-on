package com.spring.myapp.order.model;

import lombok.Data;

import java.util.Date;

@Data
public class OrderItems {
    private Long orderItemId;
    private Long orderId; // 주문 번호
    private Long productId; // 상품번호
    private Integer quantity;
    private Double price;
    private Double discountRate;
}
