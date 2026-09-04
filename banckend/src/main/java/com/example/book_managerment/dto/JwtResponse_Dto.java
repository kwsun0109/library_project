package com.example.book_managerment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@AllArgsConstructor 
public class JwtResponse_Dto {

    // 발행된 JWT토큰, 사용자 이메일, 권한 정보
    private String token;
    private String email;
    private String role;
    
}

// 보안 설계
// 포인트 안내
// 비밀번호 암호화:

// 서비스(Service) 계층에서 회원가입 로직을 처리할 때, 
// BCryptPasswordEncoder를 주입받아 passwordEncoder.encode(dto.getPassword())
//  형태로 반드시 암호화한 뒤 User 엔티티에 담아 DB에 저장해야 합니다.

// 시크릿 키 분리: JWT 서명에 사용할 시크릿 키는 절대 코드에 하드코딩하지 말고,
//  src/main/resources/application.properties (또는 yml)에 
//  아래와 같이 작성하고 깃에 올라가지 않도록 관리하세요.