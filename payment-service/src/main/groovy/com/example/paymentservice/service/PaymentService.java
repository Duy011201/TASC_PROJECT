package com.example.paymentservice.service;

import com.example.paymentservice.dto.PackageServiceDto;
import com.example.paymentservice.dto.PaymentDto;
import com.example.paymentservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PaymentService {
    public ResponseEntity<HandleResponse<PaymentDto>> createPayment(PaymentDto paymentDto);
    public ResponseEntity<HandleResponse> deletePaymentByID (PaymentDto paymentDto);
    public ResponseEntity<HandleResponse> updatePaymentByID (PaymentDto paymentDto);
    public ResponseEntity<HandleResponse<List<PaymentDto>>> getAllPayment (PaymentDto paymentDto);
}
