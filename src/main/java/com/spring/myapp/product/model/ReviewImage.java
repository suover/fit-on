package com.spring.myapp.product.model;

import lombok.Data;

@Data
public class ReviewImage {
	private Long imageId;
	private Long reviewId;
	private String imageUrl;
}