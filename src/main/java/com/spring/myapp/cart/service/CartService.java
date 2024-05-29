package com.spring.myapp.cart.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import com.spring.myapp.cart.model.Cart;
import com.spring.myapp.cart.model.CartItem;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.cart.repository.CartItemMapper;
import com.spring.myapp.cart.repository.CartMapper;
@Service
public class CartService {
	@Autowired
	private CartMapper cartMapper;

	@Autowired
	private CartItemMapper cartItemMapper;

	@Transactional
	public void addProductToCart(Long userId, Long productId, int quantity) {
		Cart cart = cartMapper.findCartByUserId(userId);
		if (cart == null) {
			cart = new Cart();
			cart.setUserId(userId);
			cartMapper.insertCart(cart);
		}

		CartItem cartItem = new CartItem();
		cartItem.setCartId(cart.getCartId());
		cartItem.setProductId(productId);
		cartItem.setQuantity(quantity);
		cartItemMapper.insertCartItem(cartItem);
	}

	public List<CartItem> getCartItems(Long userId) {
		Cart cart = cartMapper.findCartByUserId(userId);
		if (cart != null) {
			return cartItemMapper.findCartItemsByCartId(cart.getCartId());
		}
		return Collections.emptyList();
	}
}
