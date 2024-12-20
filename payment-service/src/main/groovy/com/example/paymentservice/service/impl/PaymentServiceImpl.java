package com.example.paymentservice.service.impl;

import com.example.paymentservice.dto.PaymentDto;
import com.example.paymentservice.entity.PaymentEntity;
import com.example.paymentservice.enums.PaymentStatus;
import com.example.paymentservice.repository.PaymentRepository;
import com.example.paymentservice.service.PaymentService;
import com.example.paymentservice.util.HandleResponse;
import com.example.paymentservice.util.ReflectionMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.paymentservice.config.Constant.*;

@Slf4j
@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public ResponseEntity<HandleResponse<PaymentDto>> createPayment(PaymentDto paymentDto) {
        PaymentEntity exitPackageService = paymentRepository.findPaymentByPackageServiceID(paymentDto.getPackageServiceID());
        if (exitPackageService != null && exitPackageService.getStatus().equals(PaymentStatus.DRAFT)) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), PACKAGE_SERVICE_EXIT));
        }
        PaymentEntity paymentEntity = ReflectionMapper.map(paymentDto, PaymentEntity.class);
        paymentEntity.setStatus(PaymentStatus.DRAFT);
        paymentRepository.save(paymentEntity);
        paymentDto.setPaymentID(paymentEntity.getPaymentID());
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), ADD_SUCCESS, paymentDto));
    }

    @Override
    public ResponseEntity<HandleResponse> deletePaymentByID(PaymentDto paymentDto) {
        PaymentEntity paymentEntity = paymentRepository.findPaymentByID(paymentDto.getPaymentID());
        if (paymentEntity != null) {
            paymentRepository.delete(paymentEntity);
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), DELETE_SUCCESS));
        }
        return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), DELETE_FAIL));
    }

    @Override
    public ResponseEntity<HandleResponse> updatePaymentByID(PaymentDto paymentDto) {
//        PackageServiceEntity exitPackageService = packageServiceRepository.findPackageServiceByID(packageServiceDto.getPackageServiceID());
//
//        if (exitPackageService == null) {
//            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), PACKAGE_SERVICE_NOT_EXIT));
//        }
//
//        if (!exitPackageService.getPackageServiceName().equals(packageServiceDto.getPackageServiceName())) {
//            PackageServiceEntity exitNamePackageService = packageServiceRepository.findPackageServiceByName(packageServiceDto.getPackageServiceName());
//            if (exitNamePackageService != null) {
//                return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), PACKAGE_SERVICE_EXIT));
//            }
//            exitPackageService.setPackageServiceName(packageServiceDto.getPackageServiceName());
//        }
//
//        exitPackageService = ReflectionMapper.map(packageServiceDto, PackageServiceEntity.class);
//        exitPackageService.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
//
//        packageServiceRepository.save(exitPackageService);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), UPDATE_SUCCESS));
    }

    @Override
    public ResponseEntity<HandleResponse<List<PaymentDto>>> getAllPayment(PaymentDto paymentDto) {
        List<PaymentEntity> listPaymentEntity = paymentRepository.findAll();
        List<PaymentDto> listCompanyDto = ReflectionMapper.mapList(listPaymentEntity, PaymentDto.class);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), GET_SUCCESS, listCompanyDto));
    }
}
