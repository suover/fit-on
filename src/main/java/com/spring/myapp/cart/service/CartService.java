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
		// 장바구니 ID와 상품 ID로 기존 장바구니 항목 찾기
		CartItem existingCartItem = cartItemMapper.findCartItemByCartIdAndProductId(cart.getCartId(), productId);
		if (existingCartItem != null) {
			// 기존 항목이 있으면 수량 증가
			existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
			cartItemMapper.updateCartItem(existingCartItem);
		} else {
			// 기존 항목이 없으면 새로운 항목 추가
			CartItem cartItem = new CartItem();
			cartItem.setCartId(cart.getCartId());
			cartItem.setProductId(productId);
			cartItem.setQuantity(quantity);
			cartItemMapper.insertCartItem(cartItem);
		}
	}

	public List<CartItem> getCartItems(Long userId) {
		Cart cart = cartMapper.findCartByUserId(userId);
		if (cart != null) {
			return cartItemMapper.findCartItemsByCartId(cart.getCartId());
		}
		return Collections.emptyList();
	}



	public void removeCartItem(Long userId, Long productId) {
		Cart cart = cartMapper.findCartByUserId(userId);
		CartItem cartItem = cartItemMapper.findByUserIdAndProductId(userId, productId);
		if (cartItem != null) {
			cartItemMapper.deleteCartItemByProductId(cart.getCartId(), productId);
		}
	}


	public void removeAllCartItems(Long userId) {
		cartMapper.deleteCart(userId);
	}

	// 장바구니 내 상품수량 수정
	public void updateCartItemQuantity(Long userId, Long productId, Integer quantity) {
		CartItem cartItem = cartItemMapper.findByUserIdAndProductId(userId, productId);
		if (cartItem != null) {
			cartItem.setQuantity(quantity);
			cartItemMapper.updateCartItem(cartItem);
		}
	}



}
