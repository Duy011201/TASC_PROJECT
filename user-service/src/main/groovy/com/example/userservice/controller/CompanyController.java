package com.example.userservice.controller;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.CompanyService;
import com.example.userservice.util.HandleResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/all")
    public ResponseEntity<HandleResponse<List<CompanyDto>>> getAllCompany(@Valid @RequestBody CompanyDto companyDto) {
        return companyService.getAllCompany(companyDto);
    }

    @PostMapping("/create")
    public ResponseEntity<HandleResponse<CompanyDto>> createCompany(@Valid @RequestBody CompanyDto companyDto) {
        return companyService.createCompany(companyDto);
    }

    @PostMapping("/delete")
    public ResponseEntity<HandleResponse> deleteCompanyByID(@Valid @RequestBody CompanyDto companyDto) {
        return companyService.deleteCompanyByID(companyDto);
    }

    @PostMapping("/update")
    public ResponseEntity<HandleResponse> updateCompanyByID(@Valid @RequestBody CompanyDto companyDto) {
        return companyService.updateCompanyByID(companyDto);
    }
}
