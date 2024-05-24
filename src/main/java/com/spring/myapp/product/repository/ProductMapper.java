package com.spring.myapp.product.repository;

import com.spring.myapp.product.model.Product;
import com.spring.myapp.product.model.ProductImage;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductMapper {

	List<Product> findAll();
	Product findById(Long productId);
	void save(Product product);
	void update(Product product);
	void deleteById(Long productId);

	// 상품 이미지
	void saveImage(ProductImage productImage);
	List<ProductImage> findProductImages(Long productId);
}
