package com.example.userservice.dto;

import com.example.userservice.enums.SystemStatus;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

import static com.example.userservice.config.Constant.REX_EMAIL;
import static com.example.userservice.config.Constant.REX_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private String companyID;

    @NotBlank(message = "Company name must not be blank")
    private String companyName;

    private String introduce;

    @NotBlank(message = "Email must not be blank")
    @Pattern(regexp = REX_EMAIL, message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Phone must not be blank")
    @Pattern(regexp = REX_NUMBER, message = "Phone number format is invalid")
    private String phone;

    private String province;

    private String address;

    private String field;

    private String avatar;

    @NotBlank(message = "Scale should not be less than 1")
    @Pattern(regexp = REX_NUMBER, message = "CorporateTaxCode number format is invalid")
    private String corporateTaxCode;

    @NotBlank(message = "Status must not be blank")
    private SystemStatus status;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private String createdBy = "system";

    private String updatedBy = "system";
}
