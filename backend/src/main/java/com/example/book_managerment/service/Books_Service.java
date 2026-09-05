package com.example.book_managerment.service;

import com.example.book_managerment.entity.Books;
import com.example.book_managerment.dto.Books_Dto;
import com.example.book_managerment.repository.Books_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Books_Service {

    private final Books_Repository booksRepository;

    // 도서 전체 조회
    @Transactional(readOnly = true)
    public List<Books_Dto> searchBooks(String keyword) {
        List<Books> books;

        if (keyword == null || keyword.isEmpty()) {
            books = booksRepository.findAll();
        } else {
            books = booksRepository.findByTitleContainingOrAuthorContaining(keyword, keyword);
        }
        return books.stream()
                .map(Books_Dto::new)
                .collect(Collectors.toList());
    }

    // 도서 상세 조회 (id)
    @Transactional(readOnly = true)
    public Books_Dto getBookbyId(Long id) {
        Books book = booksRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다. ID: " + id));

        return new Books_Dto(book);
    }

    // 도서 등록 (작성자 이메일 함께 저장)
    @Transactional
    public Books_Dto createBook(Books_Dto booksDto, String userEmail) {
        Books book = booksDto.toEntity();
        book.setEmail(userEmail); // 엔티티에 작성자 이메일 설정 (Entity에 email 필드가 있어야 합니다)
        Books savedBook = booksRepository.save(book);

        return new Books_Dto(savedBook);
    }

    // 도서 수정 (작성자 본인 확인)
    @Transactional
    public Books_Dto updateBook(Long id, Books_Dto booksDto, String userEmail) {
        Books book = booksRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("수정할 도서가 존재하지 않습니다. ID: " + id));

        // 작성자 본인인지 검증
        if (book.getEmail() != null && !book.getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("본인이 등록한 도서만 수정할 수 있습니다.");
        }

        // 엔티티 값 변경
        book.setTitle(booksDto.getTitle());
        book.setAuthor(booksDto.getAuthor());
        book.setPublisher(booksDto.getPublisher());
        book.setIsbn(booksDto.getIsbn());
        book.setPublicationDate(booksDto.getPublicationDate());
        book.setStock(booksDto.getStock() != null ? booksDto.getStock() : 0);

        return new Books_Dto(book);
    }

    // 도서 삭제 (작성자 본인 확인)
    @Transactional
    public void deleteBook(Long id, String userEmail) {
        Books book = booksRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 도서가 존재하지 않습니다. ID: " + id));

        // 작성자 본인인지 검증
        if (book.getEmail() != null && !book.getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("본인이 등록한 도서만 삭제할 수 있습니다.");
        }

        booksRepository.delete(book);
    }

    // 도서 목록으로 (키워드) 필터링
    @Transactional(readOnly = true)
    public List<Books_Dto> searchBooksByTitle(String title) {
        List<Books> books;

        if (title == null || title.trim().isEmpty()) {
            books = booksRepository.findAll();
        } else {
            books = booksRepository.findByTitleContaining(title);
        }
        return books.stream()
                .map(Books_Dto::new)
                .collect(Collectors.toList());
    }
}