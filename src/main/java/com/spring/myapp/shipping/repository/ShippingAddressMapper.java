package com.spring.myapp.shipping.repository;
import com.spring.myapp.shipping.model.ShippingAddress;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ShippingAddressMapper {

    ShippingAddress findDefaultAdd(@Param("userid")Long userid);

    List<ShippingAddress> findAllAdd(@Param("userid")Long userid);

}
