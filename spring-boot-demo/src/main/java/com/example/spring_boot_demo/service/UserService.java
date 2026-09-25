package com.example.spring_boot_demo.service;

import com.example.spring_boot_demo.dto.LoginRequest;
import com.example.spring_boot_demo.dto.LoginResponse;
import com.example.spring_boot_demo.dto.RegistrationRequest;
import com.example.spring_boot_demo.entity.User;
import com.example.spring_boot_demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Registration
    public User registerUser(RegistrationRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        String hashedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(hashedPassword);

        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // Login
    public LoginResponse loginUser(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        return new LoginResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }
}