package com.spring.myapp.product.controller;

import java.util.List;

import com.spring.myapp.product.model.ProductImage;
import com.spring.myapp.product.service.ProductImageService;
import com.spring.myapp.product.service.S3Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/products-image")
public class ProductImageController {
	private static final Logger logger = LoggerFactory.getLogger(ProductImageController.class);
	@Autowired
	private S3Service s3Service;
	@Autowired
	private ProductImageService productImageService;
	@PostMapping("/{id}/images")
	public void saveProductImage(@PathVariable("id") Long productId,@RequestBody ProductImage productImage){
		productImage.setProductId(productId);
		productImageService.saveProductImage(productImage);
	}

	@GetMapping("/{id}")
	public ResponseEntity<List<ProductImage>> getProductImages(@PathVariable("id") Long id) {
		logger.info("Fetching all images for product with ID: {}", id);
		List<ProductImage> productImages = productImageService.getAllProductImages(id);
		if (productImages != null && !productImages.isEmpty()) {
			logger.info("Successfully fetched {} images for product with ID: {}", productImages.size(), id);
			return ResponseEntity.ok(productImages);
		} else {
			logger.warn("No images found for product with ID: {}", id);
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/{id}/MainImgURL")
	public String getMainImgURL (@PathVariable("id") Long id){
		return productImageService.getMainImgURLByProductId(id);
	}

	@GetMapping("/{id}/SubImgURL")
	public ResponseEntity<String[]> getSubImgURL(@PathVariable("id") Long id) {
		logger.info("Fetching sub image URLs for product with ID: {}", id);
		String[] subImgUrls = productImageService.getSubImgsURLByProductId(id);
		if (subImgUrls != null) {
			logger.info("Successfully fetched {} sub image URLs for product with ID: {}", subImgUrls.length, id);
			return ResponseEntity.ok(subImgUrls);
		} else {
			logger.warn("No sub image URLs found for product with ID: {}", id);
			return ResponseEntity.notFound().build();
		}
	}
}
