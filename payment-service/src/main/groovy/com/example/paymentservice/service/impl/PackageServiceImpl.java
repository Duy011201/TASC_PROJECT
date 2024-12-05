package com.example.paymentservice.service.impl;

import com.example.paymentservice.dto.PackageServiceDto;
import com.example.paymentservice.entity.PackageServiceEntity;
import com.example.paymentservice.repository.PackageServiceRepository;
import com.example.paymentservice.service.PackageService;
import com.example.paymentservice.util.HandleResponse;
import com.example.paymentservice.util.ReflectionMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

import static com.example.paymentservice.config.Constant.*;

@Slf4j
@Service
public class PackageServiceImpl implements PackageService {

    @Autowired
    private PackageServiceRepository packageServiceRepository;

    @Override
    public ResponseEntity<HandleResponse<PackageServiceDto>> createPackageService(PackageServiceDto packageServiceDto) {
        PackageServiceEntity exitNamePackageService = packageServiceRepository.findPackageServiceByName(packageServiceDto.getPackageServiceName());

        if (exitNamePackageService == null) {
            PackageServiceEntity packageServiceEntity = new PackageServiceEntity();
            packageServiceEntity.setPackageServiceName(packageServiceDto.getPackageServiceName());
            packageServiceEntity.setPrice(packageServiceDto.getPrice());
            packageServiceEntity.setPromotion(packageServiceDto.getPromotion());
            packageServiceEntity.setContent(packageServiceDto.getContent());
            packageServiceEntity.setExpirationDate(packageServiceDto.getExpirationDate());
            packageServiceEntity.setAvatar(packageServiceDto.getAvatar());
            packageServiceEntity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            packageServiceEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            packageServiceRepository.save(packageServiceEntity);
            packageServiceDto.setPackageServiceID(packageServiceEntity.getPackageServiceID());
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), ADD_SUCCESS, packageServiceDto));
        } else {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), PACKAGE_SERVICE_EXIT));
        }
    }

    @Override
    public ResponseEntity<HandleResponse> deletePackageServiceByID(PackageServiceDto companyDto) {
        PackageServiceEntity packageServiceEntity = packageServiceRepository.findPackageServiceByID(companyDto.getPackageServiceID());
        if (packageServiceEntity != null) {
            packageServiceRepository.delete(packageServiceEntity);
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), DELETE_SUCCESS));
        }
        return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), DELETE_FAIL));
    }

    @Override
    public ResponseEntity<HandleResponse> updatePackageServiceByID(PackageServiceDto packageServiceDto) {
        PackageServiceEntity exitPackageService = packageServiceRepository.findPackageServiceByID(packageServiceDto.getPackageServiceID());

        if (exitPackageService == null) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), PACKAGE_SERVICE_NOT_EXIT));
        }

        if (!exitPackageService.getPackageServiceName().equals(packageServiceDto.getPackageServiceName())) {
            PackageServiceEntity exitNamePackageService = packageServiceRepository.findPackageServiceByName(packageServiceDto.getPackageServiceName());
            if (exitNamePackageService != null) {
                return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), PACKAGE_SERVICE_EXIT));
            }
            exitPackageService.setPackageServiceName(packageServiceDto.getPackageServiceName());
        }

        exitPackageService = ReflectionMapper.map(packageServiceDto, PackageServiceEntity.class);
        exitPackageService.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        packageServiceRepository.save(exitPackageService);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), UPDATE_SUCCESS));
    }

    @Override
    public ResponseEntity<HandleResponse<List<PackageServiceDto>>> getAllPackageService(PackageServiceDto packageServiceDto) {
        List<PackageServiceEntity> listCompanyEntity = packageServiceRepository.findAll();
        List<PackageServiceDto> listCompanyDto = ReflectionMapper.mapList(listCompanyEntity, PackageServiceDto.class);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), GET_SUCCESS, listCompanyDto));
    }
}
