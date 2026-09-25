package com.example.spring_boot_demo.controller;

import com.example.spring_boot_demo.dto.LoginRequest;
import com.example.spring_boot_demo.dto.LoginResponse;
import com.example.spring_boot_demo.dto.RegistrationRequest;
import com.example.spring_boot_demo.entity.User;
import com.example.spring_boot_demo.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegistrationRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }
}