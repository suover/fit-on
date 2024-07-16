package com.spring.myapp.product.controller;

import com.spring.myapp.cart.controller.CartController;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.service.ProductService;
import com.spring.myapp.product.service.S3Service;

import org.apache.ibatis.annotations.Update;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Validated
public class ProductController {
	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private S3Service s3Service;

	@Autowired
	private ProductService productService;
	
	
	//전체 상품리스트
	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	// 삭제처리 되지 않은 전체상품 리스트
	@GetMapping("/available")
	public List<Product> getProducts() {
		return productService.getProducts();
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	

	@GetMapping("/with-images")
	public ResponseEntity<List<Product>> getAllProductsWithMainImage() {
		List<Product> products = productService.getAllProductsWithMainImage();
		return ResponseEntity.ok(products);
	}
	@GetMapping("/with-images/active")
	public ResponseEntity<List<Product>> getAllActiveProductsWithMainImage() {
		List<Product> products = productService.getAllActiveProductsWithMainImage();
		return ResponseEntity.ok(products);
	}
	
	//카테고리별 상품 분류
	@GetMapping("/with-images/{category}/active")
	public ResponseEntity<List<Product>> getAllActiveProductsWithMainImageByCategory(@PathVariable Long category) {
		List<Product> products = productService.getAllActiveProductsWithMainImageByCategory(category);
		return ResponseEntity.ok(products);
	}
	//상품 검색
	@GetMapping("/search")
	public ResponseEntity<List<Product>> searchProducts(@RequestParam(name = "query") String query) {
		List<Product> products = productService.searchProducts(query);
		return ResponseEntity.ok(products);
	}
	

	//상품 생성
	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		Product savedProduct = productService.saveProduct(product);
		return ResponseEntity.ok(savedProduct);
	}

	//상품 수정
	@PutMapping("/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
		product.setProductId(id);
		productService.updateProduct(product);
		return ResponseEntity.ok(product);
	}

	// 상품 삭제 처리
	@PatchMapping("/{deleteId}/deactivate")
	public ResponseEntity<Void> deactivateProduct(@PathVariable("deleteId") Long deleteId) {
		try {
			productService.deactivate(deleteId, true);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}




}
