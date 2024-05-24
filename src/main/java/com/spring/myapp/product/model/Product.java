package com.spring.myapp.product.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.Date;

@Data
public class Product {
	private Long productId;
	@NotBlank(message = "Name is mandatory")
	@Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
	private String name;
	private String description;
	@NotBlank(message = "price is mandatory")
	@Size(min = 1, max = 8, message = "Name must be between 1 and 100 characters")
	private Double price;
	private Integer stock;
	private String content;
	private Double discountRate;
	private Boolean isDeleted;
	private Date createdAt;
	private Date updatedAt;
	private Long categoryId;
}
