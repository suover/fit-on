package com.spring.myapp.cart.model;

import java.util.Date;
import com.spring.myapp.product.model.Product;
import lombok.Data;
@Data
public class CartItem {
	private Long cartItemId;
	private Long cartId;
	private Long productId;
	private Integer quantity;
	private Date createdAt;
	private Date updatedAt;
	private String imageUrl; // 상품 이미지
	private Double price; // 상품 가격
	private Double discountRate; // 상품 할인율
	private String name; // 상품 이름
	private Long userId; // 사용자 ID
}