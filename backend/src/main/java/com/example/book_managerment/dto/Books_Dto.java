package com.example.book_managerment.dto;

import com.example.book_managerment.entity.Books;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Books_Dto {

    private Long id;

    @NotBlank(message = "도서 제목은 필수 입력 값입니다.")
    private String title;

    @NotBlank(message = "저자 이름은 필수 입력 값입니다.")
    private String author;

    private String publisher;

    @NotBlank(message = "ISBN 번호는 필수 입력 값입니다.")
    private String isbn;

    private LocalDate publicationDate;

    @NotNull(message = "보유 수량은 필수 입력 값입니다.")
    private Integer stock;

    private LocalDateTime createdAt;

    private String email; // 작성자 이메일 필드 추가

    // Entity를 DTO로 변환하는 생성자
    public Books_Dto(Books books) {
        this.id = books.getId();
        this.title = books.getTitle();
        this.author = books.getAuthor();
        this.publisher = books.getPublisher();
        this.isbn = books.getIsbn();
        this.publicationDate = books.getPublicationDate();
        this.stock = books.getStock();
        this.createdAt = books.getCreatedAt();
        this.email = books.getEmail(); // 엔티티의 이메일 값을 DTO로 매핑
    }

    // DTO를 Entity로 변환하는 메서드 (데이터 저장 시 활용)
    public Books toEntity() {
        Books book = new Books();
        book.setTitle(this.title);
        book.setAuthor(this.author);
        book.setPublisher(this.publisher);
        book.setIsbn(this.isbn);
        book.setPublicationDate(this.publicationDate);
        book.setStock(this.stock != null ? this.stock : 0); // null이면 기본값 0
        book.setEmail(this.email); // 이메일 매핑
        return book;
    }
}