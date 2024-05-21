package com.spring.myapp.product.model;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class ProductReview {
	private Long reviewId;
	private Long productId;
	private Long userId;
	private Integer rating;
	private String reviewText;
	private Date createdAt;
	private Date updatedAt;
	private Boolean isDeleted;
	private List<ReviewImage> reviewImages;
}
