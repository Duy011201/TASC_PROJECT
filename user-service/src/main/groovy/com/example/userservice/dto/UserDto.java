package com.example.userservice.dto;

import com.example.userservice.enums.SystemStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userID;
    private String companyID;
    private String role;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String avatar;
    private String profile;
    private SystemStatus status;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String createdBy;
    private String updatedBy;

    public UserDto(String userID, String email, String role) {
    }
}
