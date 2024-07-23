package com.spring.myapp.shipping.controller;

import com.spring.myapp.product.controller.ProductController;
import com.spring.myapp.shipping.model.ShippingAddress;
import com.spring.myapp.shipping.service.ShippingAddressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/shipadd")
public class ShippingAddressController {

    private static final Logger logger = LoggerFactory.getLogger(ShippingAddressController.class);

    @Autowired
    private ShippingAddressService SAService;

    //기본 배송지 자동 적용
    @GetMapping("/{userid}/default")
    public ResponseEntity<ShippingAddress> getUserDefaultSA(@PathVariable("userid") Long userid) {
        logger.info("userid",userid);
        ShippingAddress address =SAService.getUserDefaultSA(userid);
        return ResponseEntity.ok(address);
    }
    //배송지 리스트 불러오기
    @GetMapping("/{userid}/all")
    public ResponseEntity<List<ShippingAddress>> getUserAllSA(@PathVariable("userid") Long userid) {
        List<ShippingAddress> addresses =SAService.getUserAllSA(userid);
        return ResponseEntity.ok(addresses);
    }
    
    //배송지 추가
    
    //배송지 수정
}
