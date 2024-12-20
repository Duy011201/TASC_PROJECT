package com.example.paymentservice.entity;

import com.example.paymentservice.enums.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class PaymentEntity implements Serializable {
    @Id
    @Column(name = "paymentID", length = 36, nullable = false)
    private String paymentID = UUID.randomUUID().toString();

    @NotBlank(message = "Package service must not be blank")
    @Column(name = "packageServiceID", length = 36, nullable = false)
    private String packageServiceID;

    @NotBlank(message = "User must not be blank")
    @Column(name = "userID", length = 36, nullable = false)
    private String userID;

    @NotBlank(message = "Total expiration must not be blank")
    @Column(name = "totalExpiration", nullable = false)
    private Integer totalExpiration;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('DRAFT', 'PENDING', 'PAID', 'REJECT') DEFAULT 'DRAFT'")
    private PaymentStatus status = PaymentStatus.DRAFT;

    @Column(name = "createdAt", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;
}
