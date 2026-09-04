package com.example.book_managerment.controller;

import com.example.book_managerment.dto.Books_Dto;
import com.example.book_managerment.service.Books_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;

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

    // 도서모록 상세 조회(/api/books/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Books_Dto> getBookById(@PathVariable("id") Long id) {
        Books_Dto bookDto = booksService.getBookbyId(id);
        return ResponseEntity.ok(bookDto);
    }

    // 도서 등록(/api/books)
    @PostMapping
    public ResponseEntity<Books_Dto> createBook(@Valid @RequestBody Books_Dto booksDto) {
        Books_Dto savedBook = booksService.createBook(booksDto);

        // http 상태코드 201 created 와 함께 생성된 도서 정보 반환
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    // 도서 수정(/api/books/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Books_Dto> updateBook(
            @PathVariable("id") Long id,
            @Valid @RequestBody Books_Dto booksDto) {

        Books_Dto updatedBook = booksService.updateBook(id, booksDto);
        return ResponseEntity.ok(updatedBook);
    }

    // 도서 삭제(/api/books/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") Long id) {
        booksService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // 제목 키워드 도서 목록 필터링
    // GET /api/books/search/title?keyword=스프링 부트
    @GetMapping("/search/title")
    public ResponseEntity<List<Books_Dto>> searchByTitle(
            @RequestParam(value = "keyword", required = false) String keyword) {

        List<Books_Dto> books = booksService.searchBooksByTitle(keyword);
        return ResponseEntity.ok(books);
    }

}
