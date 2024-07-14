package com.spring.myapp.cart.repository;

import java.util.List;


import org.apache.ibatis.annotations.Param;
import com.spring.myapp.cart.model.Cart;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CartMapper {
	Cart findCartByUserId(@Param("userId") Long userId);
	void insertCart(Cart cart);
}
