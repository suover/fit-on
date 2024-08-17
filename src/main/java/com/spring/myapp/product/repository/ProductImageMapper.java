
package com.spring.myapp.product.repository;

import com.spring.myapp.product.model.ProductImage;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface ProductImageMapper {
	void saveImage(ProductImage productImage);
	List<ProductImage> findProductImages(@Param("productId")Long productId);
	String getMainImgURL(@Param("productId") Long productId);
	String[] getSubImgURL(@Param("productId")Long productId);
}