package com.example.userservice.controller;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.AuthService;
import com.example.userservice.service.UserService;
import com.example.userservice.util.HandleResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<HandleResponse> login(@Valid @RequestBody UserDto userDto) {
        return authService.login(userDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<HandleResponse<UserDto>> signupCandidate(@Valid @RequestBody UserDto userDto) {
        return authService.signup(userDto);
    }
}