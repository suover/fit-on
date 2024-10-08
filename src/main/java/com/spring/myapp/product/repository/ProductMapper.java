package com.spring.myapp.product.repository;

import com.spring.myapp.product.model.Product;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface ProductMapper {

	List<Product> findAll();
	List<Product> findAvailable();
	Product findById(@Param("productId")Long productId);
	void save(Product product);

	Long findMaxProductId();

	void updateProduct(Product product);
	void updateIsDeleted(@Param("productId")Long productId,@Param("isDeleted") Boolean isDeleted);

	List<Product> findAllWithMainImage();

//	List<Product> findAllActiveWithMainImage();
//	List<Product> findAllActiveWithMainImageByCategory(@Param("categoryId")Long categoryId);
//	List<Product> findByNameContainingIgnoreCase(String query);

	List<Product> findAllActiveWithMainImage(@Param("pageSize") int pageSize, @Param("offset") int offset);
	List<Product> findAllActiveWithMainImageByCategory(@Param("categoryId") Long categoryId, @Param("pageSize") int pageSize, @Param("offset") int offset);
	List<Product> findByNameContainingIgnoreCase(@Param("query") String query, @Param("pageSize") int pageSize, @Param("offset") int offset);

	long countAllActiveWithMainImage();
	long countAllActiveWithMainImageByCategory(@Param("categoryId") Long categoryId);
	long countByNameContainingIgnoreCase(@Param("query") String query);

}
