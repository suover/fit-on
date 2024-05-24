package com.spring.myapp.product.service;

import com.spring.myapp.product.repository.ProductMapper;
import com.spring.myapp.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

	@Autowired
	private ProductMapper productMapper;

	public List<Product> getAllProducts() {
		return productMapper.findAll();
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
		productMapper.update(product);
	}

	public void deleteProduct(Long id) {
		productMapper.deleteById(id);
	}

}
