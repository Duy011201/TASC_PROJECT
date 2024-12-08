package com.example.userservice.entity;

import com.example.userservice.enums.RecruitmentStatus;
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
@Table(name = "recruitment")
public class RecruitmentEntity implements Serializable {

    @Id
    @Column(name = "recruitmentID", length = 36, nullable = false)
    private String recruitmentID = UUID.randomUUID().toString();

    @NotBlank(message = "UserID must not be blank")
    @Column(name = "userID", length = 36, nullable = false)
    private String userID;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('PENDING', 'APPROVED', 'PUBLISHED', 'REJECT') DEFAULT 'PENDING'")
    private RecruitmentStatus status = RecruitmentStatus.PENDING;

    @NotBlank(message = "Title must not be blank")
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "Address must not be blank")
    @Column(name = "address", nullable = false)
    private String address;

    @NotBlank(message = "Description must not be blank")
    @Column(name = "description", nullable = false, columnDefinition = "LONGTEXT")
    private String description;

    @NotBlank(message = "Required must not be blank")
    @Column(name = "required", nullable = false, columnDefinition = "LONGTEXT")
    private String required;

    @NotBlank(message = "Benefit must not be blank")
    @Column(name = "benefit", nullable = false, columnDefinition = "LONGTEXT")
    private String benefit;

    @NotBlank(message = "Province must not be blank")
    @Column(name = "province", nullable = false)
    private String province;

    @NotBlank(message = "Field must not be blank")
    @Column(name = "field", nullable = false)
    private String field;

    @NotBlank(message = "Form work must not be blank")
    @Column(name = "formWork", nullable = false)
    private String formWork;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp timeStart;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp timeEnd;

    @Column(name = "salaryFrom", nullable = false)
    private int salaryFrom;

    @Column(name = "salaryTo", nullable = false)
    private int salaryTo;

    @Column(name = "createdAt", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());
}
