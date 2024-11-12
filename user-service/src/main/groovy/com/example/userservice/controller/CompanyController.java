package com.example.userservice.controller;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.CompanyService;
import com.example.userservice.util.HandleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/all")
    public ResponseEntity<HandleResponse<List<CompanyDto>>> getAllCompany(@RequestBody CompanyDto companyDto) {
        return companyService.getAllCompany(companyDto);
    }

    @GetMapping("/create")
    public ResponseEntity<HandleResponse<CompanyDto>> getUserByID(@RequestBody CompanyDto companyDto) {
        return companyService.createCompany(companyDto);
    }

    @PostMapping("/{userID}")
    public ResponseEntity<HandleResponse> deleteUserByID(@PathVariable String companyID) {
        return companyService.deleteCompanyByID(companyID);
    }
}
