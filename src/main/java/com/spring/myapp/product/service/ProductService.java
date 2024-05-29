package com.spring.myapp.product.service;

import com.spring.myapp.product.repository.ProductMapper;
import com.spring.myapp.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

	@Autowired
	private ProductMapper productMapper;

	public List<Product> getAllProducts() {
		return productMapper.findAll();
	}
	public List<Product> getProducts() {
		return productMapper.findAvailable();
	}

	public Product getProductById(Long id) {
		return productMapper.findById(id);
	}
	
	public Product saveProduct(Product product) {
		Long maxProductId = productMapper.findMaxProductId();
		product.setProductId(maxProductId + 1);
		productMapper.save(product);
		return product;
	}
	public void updateProduct(Product product) {
		productMapper.updateProduct(product);
	}

	public void  deactivate(Long id, Boolean isDeleted) {
		productMapper.updateIsDeleted(id, isDeleted);
	}
	public List<Product> getAllProductsWithMainImage() {
		return productMapper.findAllWithMainImage();
	}
	public List<Product> getAllActiveProductsWithMainImage() {
		return productMapper.findAllActiveWithMainImage();
	}
	public List<Product> getAllActiveProductsWithMainImageByCategory(Long categoryId) {
		System.out.println("서비스단 카테고리로 상품가져오기 시작");
		return productMapper.findAllActiveWithMainImageByCategory(categoryId);
	}


}
