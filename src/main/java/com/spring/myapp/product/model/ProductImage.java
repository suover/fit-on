package com.spring.myapp.product.model;

import lombok.Data;

@Data
public class ProductImage {
	private Long imageId;
	private String imageUrl;
	private Boolean isMainImage;
	private Long productId;
}
