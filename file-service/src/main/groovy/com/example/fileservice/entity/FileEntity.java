package com.example.fileservice.entity;

import com.example.fileservice.enums.SystemStatus;
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
@Table(name = "file")
public class FileEntity implements Serializable {
    @Id
    @Column(name = "fileID", length = 36, nullable = false)
    private String fileID = UUID.randomUUID().toString();

    @NotBlank(message = "File name must not be blank")
    @Column(name = "fileName", length = 255, nullable = false)
    private String fileName;

    @NotBlank(message = "File path must not be blank")
    @Column(name = "filePath", length = 255, nullable = false)
    private String filePath;

    @Column(name = "createdAt", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;
}
