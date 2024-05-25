package com.spring.myapp.product.model;

import lombok.Data;

@Data
public class ProductImage {
	private Long id;
	private Long productId;
	private String imageUrl;
	private Boolean isMainImage;
}
