package com.example.userservice.service.impl;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.CompanyEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.repository.CompanyRepository;
import com.example.userservice.service.CompanyService;
import com.example.userservice.util.HandleResponse;
import com.example.userservice.util.ReflectionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

import static com.example.userservice.config.Constant.*;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public ResponseEntity<HandleResponse<CompanyDto>> createCompany(CompanyDto companyDto) {
        CompanyEntity companyExit = companyRepository.findCompanyByCorporateTaxCode(companyDto.getCorporateTaxCode());

        if (companyExit == null) {
            CompanyEntity companyEntity = ReflectionMapper.map(companyDto, CompanyEntity.class);
            companyEntity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            companyEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            companyEntity.setCreatedBy(companyEntity.getCompanyID());
            companyRepository.save(companyEntity);
            companyDto.setCompanyID(companyEntity.getCompanyID());
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), ADD_SUCCESS, companyDto));
        } else {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), CORPORATE_TAX_CODE_EXIT));
        }
    }

    @Override
    public ResponseEntity<HandleResponse> deleteCompanyByID(String companyID) {
        CompanyEntity companyEntity = companyRepository.findCompanyByID(companyID);
        if (companyEntity != null) {
            companyRepository.delete(companyEntity);
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), DELETE_SUCCESS));
        }
        return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), DELETE_FAIL));
    }

    @Override
    public ResponseEntity<HandleResponse> updateCompanyByID(CompanyDto companyDto) {
        CompanyEntity companyExit = companyRepository.findCompanyByID(companyDto.getCompanyID());
        if (companyExit == null) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), COMPANY_NOT_EXIT));
        }

        if (!companyExit.getCorporateTaxCode().equals(companyDto.getCorporateTaxCode())) {
            CompanyEntity companyCorporateTaxCode = companyRepository.findCompanyByCorporateTaxCode(companyDto.getCorporateTaxCode());
            if (companyCorporateTaxCode != null) {
                return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), CORPORATE_TAX_CODE_EXIT));
            }
            companyExit.setCorporateTaxCode(companyDto.getCorporateTaxCode());
        }

        companyExit.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        companyExit.setUpdatedBy(companyDto.getUpdatedBy());

        companyRepository.save(companyExit);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), UPDATE_SUCCESS));
    }

    @Override
    public ResponseEntity<HandleResponse<List<CompanyDto>>> getAllCompany(CompanyDto companyDto) {
        List<CompanyEntity> listCompanyEntity = companyRepository.findAll();
        List<CompanyDto> listCompanyDto = ReflectionMapper.mapList(listCompanyEntity, CompanyDto.class);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), GET_SUCCESS, listCompanyDto));
    }
}
