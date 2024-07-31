package com.spring.myapp.payment.controller;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
//import com.siot.IamportRestClient.IamportClient;
//import com.siot.IamportRestClient.response.IamportResponse;
//import com.siot.IamportRestClient.response.Payment;
//import com.siot.IamportRestClient.exception.IamportResponseException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    @Value("${iamport.key}")
    private String restApiKey;
    @Value("${iamport.secret}")
    private String restApiSecret;

//    @PostConstruct
//    public void init() {
//        this.iamportClient = new IamportClient(restApiKey, restApiSecret);
//    }
//
//    @PostMapping("/verifyIamport/{imp_uid}")
//    public IamportResponse<Payment> paymentByImpUid(@PathVariable("imp_uid") String imp_uid) throws IamportResponseException, IOException {
//        return iamportClient.paymentByImpUid(imp_uid);
//    }
}
