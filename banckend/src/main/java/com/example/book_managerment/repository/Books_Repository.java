package com.example.book_managerment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.book_managerment.entity.Books;
import java.util.List;

public interface Books_Repository extends JpaRepository<Books, Long> {

    // 제목, 저자에 keyword가 포함된 도서 목록 조회
    List<Books> findByTitleContainingOrAuthorContaining(String titleKeyword, String authorKeyword);

    // 제목 키워드 검색 추가
    List<Books> findByTitleContaining(String title);

}
