package com.spring.myapp.cart.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import com.spring.myapp.cart.controller.CartController;
import com.spring.myapp.cart.model.Cart;
import com.spring.myapp.cart.model.CartItem;
import com.spring.myapp.product.model.Product;
import com.spring.myapp.cart.repository.CartItemMapper;
import com.spring.myapp.cart.repository.CartMapper;
@Service
public class CartService {
	private static final Logger logger = LoggerFactory.getLogger(CartService.class);

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



	@Transactional
	public void removeCartItems(Long userId, List<Long> productIds) {
		Cart cart = cartMapper.findCartByUserId(userId);
		logger.info("Removing items from cart: userId={}, cartId={}, productIds={}", userId, cart.getCartId(), productIds);
		for (Long productId : productIds) {
			logger.info("Removing product from cart: cartId={}, productId={}", cart.getCartId(), productId);
			cartItemMapper.deleteCartItemByProductId(cart.getCartId(), productId);
		}
		logger.info("Successfully removed items from cart: userId={}, productIds={}", userId, productIds);
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
