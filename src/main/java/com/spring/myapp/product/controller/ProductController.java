package com.spring.myapp.product.controller;

import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.service.ProductService;
import com.spring.myapp.product.service.S3Service;

import org.apache.ibatis.annotations.Update;
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

	@Autowired
	private S3Service s3Service;

	@Autowired
	private ProductService productService;
	
	
	//전체 상품
	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	// 삭제처리 되지 않은 상품
	@GetMapping("/available")
	public List<Product> getProducts() {
		return productService.getProducts();
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		Product savedProduct = productService.saveProduct(product);
		System.out.println(savedProduct);
		return ResponseEntity.ok(savedProduct); // 저장한 상품 정보 반환
	}
	@GetMapping("/with-images")
	public ResponseEntity<List<Product>> getAllProductsWithMainImage() {
		List<Product> products = productService.getAllProductsWithMainImage();
		System.out.println(products);

		return ResponseEntity.ok(products);
	}
	@GetMapping("/with-images/active")
	public ResponseEntity<List<Product>> getAllActiveProductsWithMainImage() {
		List<Product> products = productService.getAllActiveProductsWithMainImage();
		System.out.println(products);

		return ResponseEntity.ok(products);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
		product.setProductId(id);
		productService.updateProduct(product);
		return ResponseEntity.ok(product);
	}

	@PatchMapping("/{deleteId}/deactivate")
	public ResponseEntity<Void> deactivateProduct(@PathVariable("deleteId") Long deleteId) {
		try {

			System.out.println("Product deactivated: " + deleteId);
			productService.deactivate(deleteId, true);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}




}
