package com.example.book_managerment.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long validityInMilliseconds = 3600000; // 토큰 유효 시간: 1시간 (3600000ms)

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // 1. JWT 토큰 생성
    public String createToken(String email, String role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 2. 토큰에서 이메일 추출
    public String getEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // 3. 토큰 유효성 검증 (에러 원인 출력용)
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SignatureException e) {
            System.out.println("❌ 검증 실패: 잘못된 JWT 서명입니다.");
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("❌ 검증 실패: 만료된 JWT 토큰입니다.");
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
            System.out.println("❌ 검증 실패: 지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            System.out.println("❌ 검증 실패: JWT 토큰이 비었거나 잘못되었습니다.");
        } catch (Exception e) {
            System.out.println("❌ 검증 실패 기타 에러: " + e.getMessage());
        }
        return false;
    }
}