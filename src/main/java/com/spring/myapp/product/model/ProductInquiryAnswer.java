package com.spring.myapp.product.model;

import lombok.Data;
import java.util.Date;

@Data
public class ProductInquiryAnswer {
	private Long answerId;
	private Long inquiryId;
	private Long userId;
	private String content;
	private Date createdAt;
	private Date updatedAt;
	private Boolean isDeleted;
}