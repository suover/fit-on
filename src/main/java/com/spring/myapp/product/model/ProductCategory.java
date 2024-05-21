package com.spring.myapp.product.model;

import lombok.Data;
import java.util.List;

@Data
public class ProductCategory {
	private Long categoryId;
	private String name;
	private List<Product> products;
}
