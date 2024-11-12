package com.example.userservice.service;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CompanyService {
    public ResponseEntity<HandleResponse<CompanyDto>> createCompany(CompanyDto companyDto);
    public ResponseEntity<HandleResponse> deleteCompanyByID (String companyID);
    public ResponseEntity<HandleResponse> updateCompanyByID (CompanyDto companyDto);
    public ResponseEntity<HandleResponse<List<CompanyDto>>> getAllCompany (CompanyDto companyDto);
}
