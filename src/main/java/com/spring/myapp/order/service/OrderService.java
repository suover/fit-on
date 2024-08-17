package com.spring.myapp.order.service;

import com.spring.myapp.cart.model.Cart;
import com.spring.myapp.cart.repository.CartItemMapper;
import com.spring.myapp.cart.repository.CartMapper;
import com.spring.myapp.order.model.Order;
import com.spring.myapp.order.model.OrderItems;
import com.spring.myapp.order.model.OrderRequest;
import com.spring.myapp.order.repository.OrderItemMapper;
import com.spring.myapp.order.repository.OrderMapper;
import com.spring.myapp.product.model.Product;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderItemMapper orderItemMapper;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Autowired
    private CartMapper cartMapper;

    @Transactional
    public void createOrder(OrderRequest orderRequest) {
        try {
            logger.info("orderRequest: {}", orderRequest);
            // Order 엔티티 생성 및 저장
            Order order = new Order();
            order.setUserId(orderRequest.getUserId());
            order.setOrderDate(new Date());
            order.setStatusId(1); // 초기 상태 값
            order.setTotal(orderRequest.getTotal());
            order.setShippingFee(orderRequest.getShippingFee());
            logger.info("order: {}", order);
            orderMapper.insertOrder(order);

            // 장바구니 아이디 가져오기
            Cart cart = cartMapper.findCartByUserId(orderRequest.getUserId());

            // OrderItems 엔티티 생성 및 저장
            for (Product product : orderRequest.getProducts()) {
                logger.info("product: {}", product);
                OrderItems orderItem = new OrderItems();
                orderItem.setOrderId(order.getOrderId());
                orderItem.setProductId(product.getProductId());
                orderItem.setQuantity(product.getQuantity());
                orderItem.setPrice(product.getPrice());
                orderItem.setDiscountRate(product.getDiscountRate());
                logger.info("orderItem: {}", orderItem);
                orderItemMapper.insertOrderItem(orderItem);

                // 장바구니 항목 삭제
                cartItemMapper.deleteCartItemByProductId(cart.getCartId(), product.getProductId());
            }
        } catch (Exception e) {
            logger.error("Error creating order", e);
            throw e; // 예외를 다시 던져서 컨트롤러에서 처리하도록 함
        }
    }
}
