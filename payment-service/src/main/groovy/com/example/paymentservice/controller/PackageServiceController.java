package com.example.paymentservice.controller;

import com.example.paymentservice.dto.PackageServiceDto;
import com.example.paymentservice.service.PackageService;
import com.example.paymentservice.util.HandleResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/package-service")
public class PackageServiceController {

    @Autowired
    private PackageService packageService;

    @PostMapping("/all")
    public ResponseEntity<HandleResponse<List<PackageServiceDto>>> getAllCompany(@Valid @RequestBody PackageServiceDto packageServiceDto) {
        return packageService.getAllPackageService(packageServiceDto);
    }

    @PostMapping("/create")
    public ResponseEntity<HandleResponse<PackageServiceDto>> createPackageService(@Valid @RequestBody PackageServiceDto packageServiceDto) {
        return packageService.createPackageService(packageServiceDto);
    }

    @PostMapping("/delete")
    public ResponseEntity<HandleResponse> deletePackageServiceByID(@Valid @RequestBody PackageServiceDto packageServiceDto) {
        return packageService.deletePackageServiceByID(packageServiceDto);
    }

    @PostMapping("/update")
    public ResponseEntity<HandleResponse> updatePackageServiceByID(@Valid @RequestBody PackageServiceDto packageServiceDto) {
        return packageService.updatePackageServiceByID(packageServiceDto);
    }
}
