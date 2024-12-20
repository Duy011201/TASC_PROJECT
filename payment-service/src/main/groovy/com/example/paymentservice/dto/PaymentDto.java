package com.example.paymentservice.dto;

import com.example.paymentservice.enums.PaymentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private String paymentID = UUID.randomUUID().toString();

    @NotBlank(message = "Package service must not be blank")
    private String packageServiceID;

    @NotBlank(message = "User must not be blank")
    private String userID;

    @NotBlank(message = "Total expiration must not be blank")
    private Integer totalExpiration;

    private PaymentStatus status;

    private Timestamp createdAt;

    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;
}
