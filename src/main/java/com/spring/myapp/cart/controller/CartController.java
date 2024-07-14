package com.spring.myapp.cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.spring.myapp.cart.model.Cart;
import com.spring.myapp.cart.model.CartItem;
import com.spring.myapp.cart.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/carts")
@Validated
public class CartController {

	private static final Logger logger = LoggerFactory.getLogger(CartController.class);
	@Autowired
	private CartService cartService;

	//상품 추가
	@PostMapping("/add")
	public void addProductToCart(@RequestBody CartItem cartItem) {
		cartService.addProductToCart(cartItem.getUserId(), cartItem.getProductId(), cartItem.getQuantity());
	}

	//장바구니 가져오기
	@GetMapping("/{userId}/cartItems")
	public List<CartItem> getCartItems(@PathVariable("userId") Long userId) {
		List<CartItem> cartItems = cartService.getCartItems(userId);
		logger.info("Cart items: {}", cartItems);
		return cartItems;
	}

	//장바구니 상품 변경
	@PutMapping("/{userId}/cartItems/{productId}")
	public void updateCartItemQuantity(@PathVariable Long userId, @PathVariable Long productId, @RequestBody Integer quantity) {
		cartService.updateCartItemQuantity(userId, productId, quantity);
	}

	//장바구니 상품 삭제
	@DeleteMapping("/{userId}/cartItems/{productId}")
	public void removeCartItem(@PathVariable Long userId, @PathVariable Long productId) {
		cartService.removeCartItem(userId, productId);
	}

}
