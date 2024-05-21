package com.spring.myapp.product.model;

import lombok.Data;
import java.util.Date;

@Data
public class ProductInquiry {
	private Long inquiryId;
	private Long productId;
	private Long userId;
	private String title;
	private String content;
	private Date createdAt;
	private Date updatedAt;
	private Boolean isDeleted;
	private Long statusId;
	private Long inquiryTypeId;
}