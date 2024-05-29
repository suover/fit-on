package com.spring.myapp.cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

	@PostMapping("/add")
	public void addProductToCart(@RequestBody CartItem cartItem) {
		cartService.addProductToCart(cartItem.getUserId(), cartItem.getProductId(), cartItem.getQuantity());
	}

	@GetMapping("/{userId}/cartItems")
	public List<CartItem> getCartItems(@PathVariable("userId") Long userId) {
		List<CartItem> cartItems = cartService.getCartItems(userId);
		logger.info("Cart items: {}", cartItems);
		return cartItems;

	}
}
