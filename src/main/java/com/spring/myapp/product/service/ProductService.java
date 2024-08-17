package com.spring.myapp.product.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.spring.myapp.product.model.ProductPage;
import com.spring.myapp.product.repository.ProductMapper;
import com.spring.myapp.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {
	private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

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

	public Page<Product> getAllActiveProductsWithMainImage(Pageable pageable) {
		int pageSize = pageable.getPageSize();
		int pageNumber = pageable.getPageNumber();
		int offset = pageNumber * pageSize;

		List<Product> products = productMapper.findAllActiveWithMainImage(pageSize, offset);
		long totalElements = productMapper.countAllActiveWithMainImage();
//		int totalPages = (int) Math.ceil((double) totalElements / pageSize);
//
//		logger.info("Total elements: {}, Total pages: {}", totalElements, totalPages);

		return new PageImpl<>(products, pageable, totalElements);
	}

	public Page<Product> getAllActiveProductsWithMainImageByCategory(Long categoryId, Pageable pageable) {
		int pageSize = pageable.getPageSize();
		int pageNumber = pageable.getPageNumber();
		int offset = pageNumber * pageSize;

		logger.info("Querying products with getPageNumber: {}", pageNumber + 1);
		logger.info("Querying products with category: {}, pageSize: {}, offset: {}", categoryId, pageSize, offset);

		List<Product> products = productMapper.findAllActiveWithMainImageByCategory(categoryId, pageSize, offset);
		long totalElements = productMapper.countAllActiveWithMainImageByCategory(categoryId);
//		int totalPages = (int) Math.ceil((double) totalElements / pageSize);
//
//		logger.info("Total elements: {}, Total pages: {}", totalElements, totalPages);

		return new PageImpl<>(products, pageable, totalElements);
	}

	public Page<Product> searchProducts(String query, Pageable pageable) {
		int pageSize = pageable.getPageSize();
		int pageNumber = pageable.getPageNumber();
		int offset = pageNumber * pageSize;

		logger.info("Querying products with getPageNumber: {}", pageNumber + 1);
		logger.info("Querying products with query: {}, pageSize: {}, offset: {}", query, pageSize, offset);

		List<Product> products = productMapper.findByNameContainingIgnoreCase(query, pageSize, offset);
		long totalElements = productMapper.countByNameContainingIgnoreCase(query);
//		int totalPages = (int) Math.ceil((double) totalElements / pageSize);
//
//		logger.info("Total elements: {}, Total pages: {}", totalElements, totalPages);

		return new PageImpl<>(products, pageable, totalElements);
	}


}
