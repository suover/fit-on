package com.spring.myapp.cart.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import com.spring.myapp.cart.model.CartItem;

@Mapper
public interface CartItemMapper {
	void insertCartItem(CartItem cartItem);
	List<CartItem> findCartItemsByCartId(@Param("cartId") Long cartId);

	CartItem findByUserIdAndProductId(@Param("userId")Long userId,@Param("productId") Long productId);
	CartItem findCartItemByCartIdAndProductId(@Param("cartId")Long cartId,@Param("productId") Long productId);
	void updateCartItem(CartItem cartItem);
	void deleteCartItemByProductId(@Param("cartId")Long cartId,@Param("productId")Long productId);

}
