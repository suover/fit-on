package com.spring.myapp.product.controller;

import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.model.ProductPage;
import com.spring.myapp.product.service.ProductService;
import com.spring.myapp.product.service.S3Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
	
	
	//전체 상품리스트(이미지X)
	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	// 삭제처리 되지 않은 전체상품 리스트(이미지X)
	@GetMapping("/available")
	public List<Product> getProducts() {
		return productService.getProducts();
	}



	//상품 가져오기
	@GetMapping("/{id}/detail")
	public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
		logger.info("Fetching active product with ID: {}", id);
		Product product = productService.getProductById(id);
		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	

	// 전체 상품 불러오기
	@GetMapping("/with-images")
	public ResponseEntity<List<Product>> getAllProductsWithMainImage() {
		List<Product> products = productService.getAllProductsWithMainImage();
		return ResponseEntity.ok(products);
	}
//	// 판매 가능한 상품 전체 불러오기
//	@GetMapping("/with-images/active")
//	public ResponseEntity<List<Product>> getAllActiveProductsWithMainImage() {
//		List<Product> products = productService.getAllActiveProductsWithMainImage();
//		return ResponseEntity.ok(products);
//	}
//
////	 카테고리별 판매 가능 상품 조회
//	@GetMapping("/{categoryId}/active")
//	public ResponseEntity<List<Product>> getAllActiveProductsWithMainImageByCategory(@PathVariable("categoryId") Long categoryId) {
//		logger.info("Fetching active products with main image for category: {}", categoryId);
//		List<Product> products = productService.getAllActiveProductsWithMainImageByCategory(categoryId);
//		logger.info("Fetched {} products for category: {}", products.size(), categoryId);
//		return ResponseEntity.ok(products);
//	}
//
//	//판매 가능한 상품 검색
//	@GetMapping("/search")
//	public ResponseEntity<List<Product>> searchProducts(@RequestParam(name = "query") String query) {
//		logger.info("Fetching active products with main image for query: {}", query);
//		List<Product> products = productService.searchProducts(query);
//		logger.info("Fetched {} products for query: {}", products.size(), query);
//		return ResponseEntity.ok(products);
//	}

	//판매 가능한 전체 상품 페이징 처리
	@GetMapping("/with-images/active")
	public ResponseEntity<ProductPage<Product>> getAllActiveProductsWithMainImage(
			@RequestParam(name = "page",defaultValue = "0") int page,
			@RequestParam(name = "size",defaultValue = "12") int size) {
		ProductPage<Product> products = productService.getAllActiveProductsWithMainImage(page, size);
		return ResponseEntity.ok(products);
	}

	//카테고리별 판매 가능 상품 조회 페이징 처리
	@GetMapping("/{categoryId}/active")
	public ResponseEntity<ProductPage<Product>> getAllActiveProductsWithMainImageByCategory(
			@PathVariable("categoryId") Long categoryId,
			@RequestParam(name = "page",defaultValue = "0") int page,
			@RequestParam(name = "size",defaultValue = "12") int size) {
		ProductPage<Product> products = productService.getAllActiveProductsWithMainImageByCategory(categoryId, page, size);
		return ResponseEntity.ok(products);
	}

	//판매 가능한 상품 검색 페이징 처리
	@GetMapping("/search")
	public ResponseEntity<ProductPage<Product>> searchProducts(
			@RequestParam(name = "query") String query,
			@RequestParam(name = "page",defaultValue = "0") int page,
			@RequestParam(name = "size",defaultValue = "12") int size) {
		ProductPage<Product> products = productService.searchProducts(query, page, size);
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

	// 상품 삭제 처리(비활성화)
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
