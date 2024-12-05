package com.example.userservice.entity;

import com.example.userservice.enums.SystemStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

import static com.example.userservice.config.Constant.REX_EMAIL;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity implements Serializable {

    @Id
    @Column(name = "userID", length = 36, nullable = false)
    private String userID = UUID.randomUUID().toString();

    @Column(name = "companyID", length = 36)
    private String companyID;

    @NotBlank(message = "Role must not be blank")
    @Column(name = "role", length = 36)
    private String role;

    @Column(name = "username", length = 255)
    private String username;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email must not be blank")
    @Pattern(regexp = REX_EMAIL, message = "Email format is invalid")
    @Column(name = "email", length = 50, unique = true, nullable = false)
    private String email;

    @Min(value = 6, message = "Password should not be less than 6")
    @NotBlank(message = "Password must not be blank")
    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "profile", length = 255)
    private String profile;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('ACTIVE', 'IN_ACTIVE') DEFAULT 'ACTIVE'")
    private SystemStatus status = SystemStatus.ACTIVE;

    @Column(name = "createdAt", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(name = "updatedAt", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;
}
