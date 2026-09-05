package com.example.book_managerment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class) // createdAt 자동 생성을 위해 필요
public class Books {

    // PK, 자동증가(도서고유번호)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 도서제목
    @Column(nullable = false, length = 100)
    private String title;

    // 도서저자
    @Column(nullable = false, length = 50)
    private String author;

    // 출판사
    @Column(length = 100)
    private String publisher;

    // ISBN 번호
    @Column(nullable = false, unique = true, length = 20)
    private String isbn;

    // 출판일
    private LocalDate publicationDate;

    // 보유수량
    @Column(columnDefinition = "integer default 0")
    private Integer stock = 0;

    // 등록일시
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // 등록자 이메일 (작성자 본인 확인용)
    @Column(name = "user_email", length = 100)
    private String email;

    @PrePersist
    public void PrePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}