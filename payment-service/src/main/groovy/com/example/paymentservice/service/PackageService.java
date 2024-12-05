package com.example.paymentservice.service;

import com.example.paymentservice.dto.PackageServiceDto;
import com.example.paymentservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PackageService {
    public ResponseEntity<HandleResponse<PackageServiceDto>> createPackageService(PackageServiceDto companyDto);
    public ResponseEntity<HandleResponse> deletePackageServiceByID (PackageServiceDto companyDto);
    public ResponseEntity<HandleResponse> updatePackageServiceByID (PackageServiceDto companyDto);
    public ResponseEntity<HandleResponse<List<PackageServiceDto>>> getAllPackageService (PackageServiceDto companyDto);
}
