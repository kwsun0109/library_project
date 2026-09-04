package com.example.book_managerment.config;

import com.example.book_managerment.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    // 🔒 1. 비밀번호 암호화(BCrypt) 빈 등록 (이 부분이 에러를 해결합니다!)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🛡️ 2. 시큐리티 필터 체인 설정 (권한 규칙 정의)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // REST API이므로 CSRF 보안 비활성화
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT
                                                                                                              // 사용하므로
                                                                                                              // 세션 생성 안
                                                                                                              // 함
                .authorizeHttpRequests(auth -> auth
                        // 회원가입, 로그인 및 도서 조회(GET)는 누구나 접근 가능
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/books/**").permitAll()

                        // 그 외의 요청(도서 등록 POST, 수정 PUT, 삭제 DELETE 등)은 인증된 사용자만 접근 가능
                        .anyRequest().authenticated());

        return http.build();
    }
}