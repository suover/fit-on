package com.spring.myapp.product.controller;

import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.model.ProductImage;
import com.spring.myapp.product.service.ProductService;
import com.spring.myapp.product.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@Autowired
	private S3Service s3Service;

	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}


	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	@PostMapping
	public void createProduct(@RequestBody Product product) {
		System.out.println("현재 컨트롤러단");
		productService.saveProduct(product);
		System.out.println("컨트롤러 단: 서비스 종료");
	}

	@PutMapping("/{id}")
	public void updateProduct(@PathVariable Long id, @RequestBody Product product) {
		product.setProductId(id);
		productService.updateProduct(product);
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
	}


	@PostMapping("/{productImage.productId}/images")
	public void saveProductImage(@RequestBody ProductImage productImage){
		System.out.println("컨트롤러단 이미지 저장 실행");
		productService.saveProductImage(productImage);
		System.out.println("컨트롤러 단 끝: 서비스 이미지 저장 종료");
	}
	@GetMapping("/{productImage.productId}/images")
	public List<ProductImage> getProductImages (@PathVariable Long id){
		return productService.getAllProductImages(id);
	}


}
