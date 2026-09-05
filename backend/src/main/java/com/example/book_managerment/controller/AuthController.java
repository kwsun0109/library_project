package com.example.book_managerment.controller;

import com.example.book_managerment.dto.JwtResponse_Dto;
import com.example.book_managerment.dto.Users_Login_Dto;
import com.example.book_managerment.dto.Users_Dto;
import com.example.book_managerment.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // 회원가입 API (POST /api/auth/signup)
    @PostMapping("/signup")
    public ResponseEntity<Long> signup(@Valid @RequestBody Users_Dto requestDto) {
        Long userId = userService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userId);
    }

    // 로그인 API (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<JwtResponse_Dto> login(@Valid @RequestBody Users_Login_Dto requestDto) {
        JwtResponse_Dto responseDto = userService.login(requestDto);
        return ResponseEntity.ok(responseDto);
    }
}
