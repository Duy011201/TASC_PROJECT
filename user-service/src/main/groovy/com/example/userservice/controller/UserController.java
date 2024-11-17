package com.example.userservice.controller;

import com.example.userservice.dto.UserDto;
import com.example.userservice.service.UserService;
import com.example.userservice.util.HandleResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userID}")
    public ResponseEntity<HandleResponse<UserDto>> getUserByID(@PathVariable String userID) {
        return userService.getUserByID(userID);
    }

    @GetMapping("/create")
    public ResponseEntity<HandleResponse<UserDto>> getUserByID(@Valid @RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }

    @GetMapping("/all")
    public ResponseEntity<HandleResponse<List<UserDto>>> getAllUser() {
        return userService.getAllUser();
    }

    @PostMapping("/{userID}")
    public ResponseEntity<HandleResponse> deleteUserByID(@Valid @PathVariable String userID) {
        return userService.deleteUserByID(userID);
    }

    @PostMapping("/update")
    public ResponseEntity<HandleResponse> updateUserByID(@Valid @RequestBody UserDto userDto) {
        return userService.updateUserByID(userDto);
    }
}
