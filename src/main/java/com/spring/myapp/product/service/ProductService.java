package com.spring.myapp.product.service;

// import com.spring.myapp.product.model.ProductPage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.repository.ProductMapper;

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

	public void deactivate(Long id, Boolean isDeleted) {
		productMapper.updateIsDeleted(id, isDeleted);
	}

	public List<Product> getAllProductsWithMainImage() {
		return productMapper.findAllWithMainImage();
	}

	//	public List<Product> getAllActiveProductsWithMainImage() {
	//		return productMapper.findAllActiveWithMainImage();
	//	}
	//	public List<Product> getAllActiveProductsWithMainImageByCategory(Long categoryId) {
	//		return productMapper.findAllActiveWithMainImageByCategory(categoryId);
	//	}
	//	//상품 검색
	//	public List<Product> searchProducts(String query) {
	//		return productMapper.findByNameContainingIgnoreCase(query);
	//	}

	// public ProductPage<Product> getAllActiveProductsWithMainImage(int page, int size) {
	// 	int offset = (page - 1) * size;
	// 	List<Product> products = productMapper.findAllActiveWithMainImage(size, offset);
	// 	long totalElements = productMapper.countAllActiveWithMainImage();
	// 	int totalPages = (int)Math.ceil((double)totalElements / size);
	//
	// 	return new ProductPage<>(products, page, size, totalElements, totalPages);
	// }

	// public ProductPage<Product> getAllActiveProductsWithMainImageByCategory(Long categoryId, int page, int size) {
	// 	int offset = (page - 1) * size;
	// 	List<Product> products = productMapper.findAllActiveWithMainImageByCategory(categoryId, size, offset);
	// 	long totalElements = productMapper.countAllActiveWithMainImageByCategory(categoryId);
	// 	int totalPages = (int) Math.ceil((double) totalElements / size);
	//
	// 	return new ProductPage<>(products, page, size, totalElements, totalPages);
	// }
	//
	// public ProductPage<Product> searchProducts(String query, int page, int size) {
	// 	int offset = (page - 1) * size;
	// 	List<Product> products = productMapper.findByNameContainingIgnoreCase(query, size, offset);
	// 	long totalElements = productMapper.countByNameContainingIgnoreCase(query);
	// 	int totalPages = (int) Math.ceil((double) totalElements / size);
	//
	// 	return new ProductPage<>(products, page, size, totalElements, totalPages);
	// }

}
