package com.example.employee.controller;

import com.example.employee.model.User;
import com.example.employee.repository.UserRepository;
import com.example.employee.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        repo.save(user);

        return Map.of("message", "User registered successfully");
    }

    // ✅ LOGIN (FIXED - RETURNS JSON)
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        Optional<User> existing = repo.findByUsername(user.getUsername());

        if (existing.isPresent() &&
                encoder.matches(user.getPassword(), existing.get().getPassword())) {

            User u = existing.get();

            String token = jwtUtil.generateToken(u.getUsername(), u.getRole());

            return Map.of("token", token);
        }

        return Map.of("error", "Invalid credentials");
    }
}