package com.spring.myapp.product.service;

import com.spring.myapp.product.dao.ProductMapper;
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

	public void saveProduct(Product product) {
		System.out.println("서비스단 saveProduct 실행");
		System.out.println("프로덕트 출력 : " + product);
		System.out.println("서비스 단 : 매퍼 실행");
		productMapper.save(product);
		System.out.println("서비스 단 : 매퍼 실행 종료");
	}

	public void updateProduct(Product product) {
		productMapper.update(product);
	}

	public void deleteProduct(Long id) {
		productMapper.deleteById(id);
	}
}
