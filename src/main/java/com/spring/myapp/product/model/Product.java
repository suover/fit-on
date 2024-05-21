package com.spring.myapp.product.model;


import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class Product {
	private Long productId;
	private String name;
	private String description;
	private Double price;
	private Integer stock;
	private String content;
	private Double discountRate;
	private Boolean isDeleted;
	private Date createdAt;
	private Date updatedAt;
	private ProductCategory category;
	private List<ProductImage> images;
}
