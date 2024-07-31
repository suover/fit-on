package com.spring.myapp.order.repository;

import com.spring.myapp.order.model.OrderItems;
import org.apache.ibatis.annotations.Mapper;
import com.spring.myapp.order.model.Order;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface OrderItemMapper {
    void insertOrderItem(OrderItems orderItem);
}
