package com.example.userservice.dto;

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
public class RecruitmentDto {

    private String recruitmentID;

    @NotBlank(message = "UserID must not be blank")
    private String userID;

    private RecruitmentStatus status;

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Address must not be blank")
    private String address;

    @NotBlank(message = "Description must not be blank")
    private String description;

    @NotBlank(message = "Required must not be blank")
    private String required;

    @NotBlank(message = "Benefit must not be blank")
    private String benefit;

    @NotBlank(message = "Province must not be blank")
    private String province;

    @NotBlank(message = "Field must not be blank")
    private String field;

    @NotBlank(message = "Form work must not be blank")
    private String formWork;

    private Timestamp timeStart;

    private Timestamp timeEnd;

    private int salaryFrom;

    private int salaryTo;

    private Timestamp createdAt;

    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());
}
