package com.example.paymentservice.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PackageServiceDto {
    private String packageServiceID;

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

    @Column(name = "avatar", nullable = false)
    private String avatar;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
