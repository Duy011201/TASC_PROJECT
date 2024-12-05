package com.example.fileservice.dto;

import com.example.fileservice.enums.SystemStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

import static com.example.fileservice.config.Constant.REX_EMAIL;
import static com.example.fileservice.config.Constant.REX_NUMBER;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileDto {
    private String fileID = UUID.randomUUID().toString();

    @NotBlank(message = "File name must not be blank")
    private String fileName;

    @NotBlank(message = "File path must not be blank")
    private String filePath;

    private Timestamp createdAt;

    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;
}
