import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 스프링 부트 백엔드에 GET / books 요철 (Vite 프록시에 의해 http://localhost:8080/books 로 전달됨)
        api.get('/books')
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('도서 목록을 불러오지 못했습니다.', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>💕도서 관리 시스템 - 연동 테스트</h2>
            <ul>
                {books.length === 0 ? (
                    <li>등록된 도서가 없습니다.</li>
                ) : (
                    books.map((book) => (
                        <li key={book.id}>
                            <b>{book.title}</b> - {book.author}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default BookList;