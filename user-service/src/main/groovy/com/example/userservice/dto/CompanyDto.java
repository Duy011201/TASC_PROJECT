package com.example.userservice.dto;

import com.example.userservice.enums.SystemStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private String companyID;
    private String companyName;
    private String introduce;
    private String email;
    private String phone;
    private String province;
    private String address;
    private String field;
    private String avatar;
    private Integer scale;
    private String corporateTaxCode;
    private SystemStatus status;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String createdBy = "system";
    private String updatedBy = "system";
}
