package com.example.userservice.controller;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.AuthService;
import com.example.userservice.service.UserService;
import com.example.userservice.util.HandleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<HandleResponse> login(@RequestBody UserDto userDto) {
        return authService.login(userDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<HandleResponse<UserDto>> signupCandidate(@RequestBody UserDto userDto) {
        return authService.signup(userDto);
    }
}