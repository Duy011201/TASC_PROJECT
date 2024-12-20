package com.example.paymentservice.controller;

import com.example.paymentservice.dto.PaymentDto;
import com.example.paymentservice.service.PaymentService;
import com.example.paymentservice.util.HandleResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/all")
    public ResponseEntity<HandleResponse<List<PaymentDto>>> getAllPayment(@Valid @RequestBody PaymentDto paymentDto) {
        return paymentService.getAllPayment(paymentDto);
    }

    @PostMapping("/create")
    public ResponseEntity<HandleResponse<PaymentDto>> createPayment(@Valid @RequestBody PaymentDto paymentDto) {
        return paymentService.createPayment(paymentDto);
    }

    @PostMapping("/delete")
    public ResponseEntity<HandleResponse> deletePaymentByID(@Valid @RequestBody PaymentDto paymentDto) {
        return paymentService.deletePaymentByID(paymentDto);
    }

    @PostMapping("/update")
    public ResponseEntity<HandleResponse> updatePaymentByID(@Valid @RequestBody PaymentDto paymentDto) {
        return paymentService.updatePaymentByID(paymentDto);
    }
}
