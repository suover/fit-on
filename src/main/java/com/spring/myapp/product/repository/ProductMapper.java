package com.spring.myapp.product.repository;

import com.spring.myapp.product.model.Product;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface ProductMapper {

	List<Product> findAll();
	List<Product> findAvailable();
	Product findById(Long productId);
	void save(Product product);

	Long findMaxProductId();

	void updateProduct(Product product);
	void updateIsDeleted(@Param("productId")Long productId,@Param("isDeleted") Boolean isDeleted);

	List<Product> findAllWithMainImage();
	List<Product> findAllActiveWithMainImage();
}
