package com.example.userservice.service;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public ResponseEntity<HandleResponse<UserDto>> createUser (UserDto userDto);
    public ResponseEntity<HandleResponse> updateUserByID (UserDto userDto);
    public ResponseEntity<HandleResponse<UserDto>> getUserByID (String userID);
    public ResponseEntity<HandleResponse> deleteUserByID (String userID);
}
