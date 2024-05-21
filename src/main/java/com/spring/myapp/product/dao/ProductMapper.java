

package com.spring.myapp.product.dao;

import com.spring.myapp.product.model.Product;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductMapper {

	@Select("SELECT * FROM products")
	@Results(id = "ProductResultMap", value = {
		@Result(property = "productId", column = "product_id", id = true),
		@Result(property = "name", column = "name"),
		@Result(property = "description", column = "description"),
		@Result(property = "price", column = "price"),
		@Result(property = "stock", column = "stock"),
		@Result(property = "content", column = "content"),
		@Result(property = "discountRate", column = "discount_rate"),
		@Result(property = "isDeleted", column = "is_deleted"),
		@Result(property = "createdAt", column = "created_at"),
		@Result(property = "updatedAt", column = "updated_at"),
		@Result(property = "category", column = "category_id",
			one = @One(select = "com.spring.myapp.product.dao.ProductCategoryMapper.findById")),
		@Result(property = "images", column = "product_id",
			many = @Many(select = "com.spring.myapp.product.dao.ProductImageMapper.findByProductId"))
	})
	List<Product> findAll();

	@Select("SELECT * FROM products WHERE product_id = #{productId}")
	@ResultMap("ProductResultMap")
	Product findById(Long productId);

	@Insert("INSERT INTO products (name, description, price, stock, content, discount_rate, is_deleted, created_at, updated_at, category_id) " +
		"VALUES (#{name}, #{description}, #{price}, #{stock}, #{content}, #{discountRate}, #{isDeleted}, #{createdAt}, #{updatedAt}, #{category.categoryId})")
	@Options(useGeneratedKeys = true, keyProperty = "productId")
	void save(Product product);

	@Update("UPDATE products SET name = #{name}, description = #{description}, price = #{price}, stock = #{stock}, content = #{content}, " +
		"discount_rate = #{discountRate}, is_deleted = #{isDeleted}, created_at = #{createdAt}, updated_at = #{updatedAt}, category_id = #{category.categoryId} " +
		"WHERE product_id = #{productId}")
	void update(Product product);

	@Delete("DELETE FROM products WHERE product_id = #{productId}")
	void deleteById(Long productId);
}
