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
	void update(Product product);
	void deleteById(Long productId);
	Long findMaxProductId();

	@Update("UPDATE products SET is_deleted = #{isDeleted} WHERE product_id = #{productId}")
	void updateIsDeleted(@Param("productId") Long productId, @Param("isDeleted") Boolean isDeleted);

}
