package com.spring.myapp.cart.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import nonapi.io.github.classgraph.json.Id;

import java.util.Date;
import com.spring.myapp.product.model.Product;

@Data
public class Cart {
	private Long cartId;
	private Long userId;
	private Date createdAt;
	private Date updatedAt;
}

