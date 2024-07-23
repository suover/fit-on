package com.spring.myapp.shipping.service;

import com.spring.myapp.shipping.model.ShippingAddress;
import com.spring.myapp.shipping.repository.ShippingAddressMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class ShippingAddressService {
    @Autowired
    private ShippingAddressMapper shippingAddressMapper;

    public ShippingAddress getUserDefaultSA(Long userid){
        return shippingAddressMapper.findDefaultAdd(userid);
    }

    public List<ShippingAddress> getUserAllSA(Long userid){
        return shippingAddressMapper.findAllAdd(userid);
    }


}
