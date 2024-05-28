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
}
