package com.example.userservice.service;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface CompanyService {
    public ResponseEntity<HandleResponse<CompanyDto>> createCompany(CompanyDto companyDto);
    public ResponseEntity<HandleResponse<CompanyDto>> deleteCompanyByID (String companyID);
    public ResponseEntity<HandleResponse<CompanyDto>> updateCompanyByID (CompanyDto companyDto);
}
