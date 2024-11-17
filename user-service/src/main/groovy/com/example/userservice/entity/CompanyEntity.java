package com.example.userservice.entity;

import com.example.userservice.enums.SystemStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

import static com.example.userservice.config.Constant.REX_EMAIL;
import static com.example.userservice.config.Constant.REX_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company")
public class CompanyEntity implements Serializable {
    @Id
    @Column(name = "companyID", length = 36, nullable = false)
    private String companyID = UUID.randomUUID().toString();

    @NotBlank(message = "Company name must not be blank")
    @Column(name = "companyName", length = 255, nullable = false)
    private String companyName;

    @Column(name = "introduce")
    private String introduce;

    @NotBlank(message = "Email must not be blank")
    @Pattern(regexp = REX_EMAIL, message = "Email format is invalid")
    @Column(name = "email", length = 50)
    private String email;

    @NotBlank(message = "Phone must not be blank")
    @Pattern(regexp = REX_NUMBER, message = "Phone number format is invalid")
    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "province", length = 255)
    private String province;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "field", length = 255)
    private String field;

    @Column(name = "avatar", length = 255)
    private String avatar;

    @Min(value = 1, message = "Scale should not be less than 1")
    @Column(name = "scale", columnDefinition = "SMALLINT")
    private Integer scale;

    @NotBlank(message = "Scale should not be less than 1")
    @Pattern(regexp = REX_NUMBER, message = "CorporateTaxCode number format is invalid")
    @Column(name = "corporateTaxCode", length = 100, unique = true, nullable = false)
    private String corporateTaxCode;

    @Enumerated(EnumType.STRING)
    @NotBlank(message = "Status must not be blank")
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('ACTIVE', 'IN_ACTIVE') DEFAULT 'ACTIVE'")
    private SystemStatus status = SystemStatus.ACTIVE;

    @Column(name = "createdAt", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;

    @Column(name = "createdBy", length = 36, nullable = false)
    private String createdBy = "system";

    @Column(name = "updatedBy", length = 36, nullable = false)
    private String updatedBy = "system";
}
