package com.example.userservice.dto;

import com.example.userservice.enums.SystemStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

import static com.example.userservice.config.Constant.REX_EMAIL;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userID;

    private String companyID;

    private String role;

    private String username;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email must not be blank")
    @Pattern(regexp = REX_EMAIL, message = "Email format is invalid")
    private String email;

    @Min(value = 6, message = "Password should not be less than 6")
    @NotBlank(message = "Password must not be blank")
    private String password;

    private String phone;

    private String profile;

    private SystemStatus status;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
