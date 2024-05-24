package com.spring.myapp.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.myapp.product.model.ProductImage;
import com.spring.myapp.product.repository.ProductImageMapper;

@Service
public class ProductImageService {
	@Autowired
	private ProductImageMapper productImageMapper;

	public void saveProductImage(ProductImage productImage) {productImageMapper.saveImage(productImage);}
	public List<ProductImage> getAllProductImages(Long id) {
		return productImageMapper.findProductImages(id);
	}
}
