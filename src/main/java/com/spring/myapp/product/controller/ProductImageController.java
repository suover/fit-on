package com.spring.myapp.product.controller;

import java.util.List;

import com.spring.myapp.product.model.ProductImage;
import com.spring.myapp.product.service.ProductImageService;
import com.spring.myapp.product.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products-image")
public class ProductImageController {
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
	public List<ProductImage> getProductImages (@PathVariable("id") Long id){
		return productImageService.getAllProductImages(id);
	}

	@GetMapping("/{id}/MainImgURL")
	public String getMainImgURL (@PathVariable("id") Long id){
		return productImageService.getMainImgURLByProductId(id);
	}



	// @GetMapping("/{productId}/main-image")
	// public ResponseEntity<ProductImage> getMainImageURL(@PathVariable("productId") Long id) {
	// 	ProductImage returnImg = productImageService.getMainImageByProductId(id);
	// 	return ResponseEntity.ok(returnImg); // 저장한 상품 정보 반환
	// }
}
