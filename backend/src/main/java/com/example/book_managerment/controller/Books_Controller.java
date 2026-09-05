package com.example.book_managerment.controller;

import com.example.book_managerment.dto.Books_Dto;
import com.example.book_managerment.service.Books_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class Books_Controller {

    private final Books_Service booksService;

    // 도서 전체 목록 조회 API
    @GetMapping
    public ResponseEntity<List<Books_Dto>> searchBooks(
            @RequestParam(value = "keyword", required = false) String keyword) {
        List<Books_Dto> books = booksService.searchBooks(keyword);
        return ResponseEntity.ok(books);
    }

    // 도서 목록 상세 조회(/api/books/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Books_Dto> getBookById(@PathVariable("id") Long id) {
        Books_Dto bookDto = booksService.getBookbyId(id);
        return ResponseEntity.ok(bookDto);
    }

    // 도서 등록(/api/books)
    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody Books_Dto bookDto, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        String userEmail = authentication.getName();
        Books_Dto savedBook = booksService.createBook(bookDto, userEmail);
        return ResponseEntity.status(201).body(savedBook);
    }

    // 도서 수정(/api/books/{id}) - 내 책만 수정 가능
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(
            @PathVariable("id") Long id,
            @Valid @RequestBody Books_Dto booksDto,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        String userEmail = authentication.getName();
        Books_Dto updatedBook = booksService.updateBook(id, booksDto, userEmail);
        return ResponseEntity.ok(updatedBook);
    }

    // 도서 삭제(/api/books/{id}) - 내 책만 삭제 가능
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(
            @PathVariable("id") Long id,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        String userEmail = authentication.getName();
        booksService.deleteBook(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    // 제목 키워드 도서 목록 필터링
    @GetMapping("/search/title")
    public ResponseEntity<List<Books_Dto>> searchByTitle(
            @RequestParam(value = "keyword", required = false) String keyword) {
        List<Books_Dto> books = booksService.searchBooksByTitle(keyword);
        return ResponseEntity.ok(books);
    }
}