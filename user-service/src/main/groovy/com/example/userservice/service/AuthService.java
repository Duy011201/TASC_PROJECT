package com.example.userservice.service;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    public ResponseEntity<HandleResponse> login (UserDto userDto);
    public ResponseEntity<HandleResponse<UserDto>> signup (UserDto userDto);
}
