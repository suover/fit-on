package com.spring.myapp.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.myapp.product.model.ProductImage;
import com.spring.myapp.product.repository.ProductImageMapper;
import java.util.List;

@Service
public class ProductImageService {
	@Autowired
	private ProductImageMapper productImageMapper;
	public void saveProductImage(ProductImage productImage) {productImageMapper.saveImage(productImage);}
	public List<ProductImage> getAllProductImages(Long id) {
		return productImageMapper.findProductImages(id);
	}
}
