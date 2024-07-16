package com.spring.myapp.product.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.myapp.product.controller.ProductImageController;
import com.spring.myapp.product.model.ProductImage;
import com.spring.myapp.product.repository.ProductImageMapper;
import java.util.List;

@Service
public class ProductImageService {
	private static final Logger logger = LoggerFactory.getLogger(ProductImageService.class);
	@Autowired
	private ProductImageMapper productImageMapper;

	public void saveProductImage(ProductImage productImage) {productImageMapper.saveImage(productImage);}//상품 저장

	public List<ProductImage> getAllProductImages(Long productId) {
		logger.debug("Retrieving all images from database for product ID: {}", productId);
		List<ProductImage> productImages = productImageMapper.findProductImages(productId);
		if (productImages != null && !productImages.isEmpty()) {
			logger.debug("Found {} images for product ID: {}", productImages.size(), productId);
		} else {
			logger.debug("No images found for product ID: {}", productId);
		}
		return productImages;
	}

	public String getMainImgURLByProductId(Long productId) {
		return productImageMapper.getMainImgURL(productId);
	}// 메인이미지 경로

	public String[] getSubImgsURLByProductId(Long productId) {
		logger.debug("Retrieving sub image URLs from database for product ID: {}", productId);
		String[] subImgUrls = productImageMapper.getSubImgURL(productId);
		if (subImgUrls != null && subImgUrls.length > 0) {
			logger.debug("Found {} sub image URLs for product ID: {}", subImgUrls.length, productId);
		} else {
			logger.debug("No sub image URLs found for product ID: {}", productId);
		}
		return subImgUrls;
	}
}
