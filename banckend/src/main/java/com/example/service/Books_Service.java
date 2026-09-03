package com.example.service;

import com.example.entity.Books;
import com.example.dto.Books_Dto;
import com.example.repository.Books_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Books_Service {

    private final Books_Repository booksRepository;

    // 도서 전제 조회
    @Transactional(readOnly = true)
    public List<Books_Dto> searchBooks(String keyword) {
        List<Books> books;

        if (keyword == null || keyword.isEmpty()) {
            // 키워드가 없으면 전체 목록 조회
            books = booksRepository.findAll();
        } else {
            // 키워드가 있으면 제목/저자 검색
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

    // 도서 등록
    @Transactional
    public Books_Dto createBook(Books_Dto booksDto) {
        // dto 를 entity로 변환 후 저장
        Books book = booksDto.toEntity();
        Books savedBook = booksRepository.save(book);

        // 저장된 entity를 dto로 다시 변환해서 반환
        return new Books_Dto(savedBook);
    }

    // 도서 수정
    @Transactional
    public Books_Dto updateBook(Long id, Books_Dto booksDto) {
        // 수정할 책 정보가 존재 하는지 확인
        Books book = booksRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("수정할 도서가 존재하지 않습니다. ID: " + id));

        // 엔티티 값 변경 (Setter 사용)
        book.setTitle(booksDto.getTitle());
        book.setAuthor(booksDto.getAuthor());
        book.setPublisher(booksDto.getPublisher());
        book.setIsbn(booksDto.getIsbn());
        book.setPublicationDate(booksDto.getPublicationDate());
        book.setStock(booksDto.getStock() != null ? booksDto.getStock() : 0);

        return new Books_Dto(book);
    }

    // 도서 삭제
    @Transactional
    public void deleteBook(Long id) {
        // 삭제할 데이터(도서)가 존재하는지 확인
        Books book = booksRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 도서가 존재하지 않습니다. ID: " + id));

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
