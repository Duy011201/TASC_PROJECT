package com.example.paymentservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "packageService")
public class PackageServiceEntity implements Serializable {
    @Id
    @Column(name = "packageServiceID", length = 36, nullable = false)
    private String packageServiceID = UUID.randomUUID().toString();

    @NotBlank(message = "Package service name must not be blank")
    @Column(name = "packageServiceName", length = 255, nullable = false)
    private String packageServiceName;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "promotion", nullable = false)
    private Integer promotion;

    @Column(name = "content")
    private String content;

    @Column(name = "expirationDate", nullable = false)
    private Integer expirationDate;

    @Column(name = "avatar", length = 255)
    private String avatar;

    @Column(name = "createdAt", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;
}
