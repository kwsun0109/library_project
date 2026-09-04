package com.example.book_managerment.service;

import com.example.book_managerment.dto.JwtResponse_Dto;
import com.example.book_managerment.dto.Users_Login_Dto;
import com.example.book_managerment.dto.Users_Dto;
import com.example.book_managerment.entity.Users;
import com.example.book_managerment.repository.UserRepository;
import com.example.book_managerment.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // 1. 회원가입
    @Transactional
    public Long signup(Users_Dto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        Users user = new Users();
        user.setEmail(requestDto.getEmail());
        // 🔒 비밀번호 BCrypt 단방향 해시 암호화 저장
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setName(requestDto.getName());
        user.setRole("USER"); // 기본 권한 USER

        Users savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    // 2. 로그인
    public JwtResponse_Dto login(Users_Login_Dto requestDto) {
        Users user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 비밀번호 일치 확인
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 시 JWT 토큰 발급
        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRole());

        return new JwtResponse_Dto(token, user.getEmail(), user.getRole());
    }
}
