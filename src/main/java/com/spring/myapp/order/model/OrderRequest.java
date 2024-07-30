package com.spring.myapp.order.model;



import com.spring.myapp.product.model.Product;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private List<Product> products;
    private BigDecimal total;
    private BigDecimal shippingFee;
}

