package com.example.employee.controller;

import com.example.employee.dto.AuthRequest;
import com.example.employee.dto.AuthResponse;
import com.example.employee.entity.User;
import com.example.employee.repository.UserRepository;
import com.example.employee.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository repo,
                          PasswordEncoder encoder,
                          JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "User registered";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {

        User user = repo.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid user"));

        if (encoder.matches(req.getPassword(), user.getPassword())) {

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
            return new AuthResponse(token);
        }

        throw new RuntimeException("Invalid credentials");
    }
}