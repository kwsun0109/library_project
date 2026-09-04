import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 로그인 상태 및 사용자 이메일 관리
  const [token, setToken] = useState(localStorage.getItem('token'));
  const userEmail = localStorage.getItem('email');

  const fetchBooks = async (searchKeyword = '') => {
    try {
      setError(null);
      const response = await api.get('/books', {
        params: { keyword: searchKeyword }
      });
      setBooks(response.data);
    } catch (err) {
      console.error(err);
      setError('도서 목록을 불러오는 중 서버와 통신에 실패했습니다. 백엔드 서버가 켜져 있는지 확인해주세요.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(keyword);
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }

    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      console.error(err);
      alert('삭제 권한이 없거나 처리 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      {/* 상단 타이틀 및 인증 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#333', fontSize: '24px' }}>📚 도서 관리 시스템</h2>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {token ? (
            <>
              <span style={{ fontSize: '14px', color: '#555' }}>👤 <b>{userEmail}</b>님</span>
              <button 
                onClick={() => navigate('/books/new')} 
                style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
              >
                + 새 도서 등록
              </button>
              <button 
                onClick={handleLogout} 
                style={{ padding: '8px 16px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')} 
                style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
              >
                로그인
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      {/* 서버 에러 메시지 */}
      {error && (
        <div style={{ color: '#d9534f', background: '#fdf7f7', border: '1px solid #f5c6cb', padding: '15px', borderRadius: '8px', marginBottom: '25px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {/* 검색 바 영역 */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <input 
          type="text" 
          placeholder="검색할 도서 제목 또는 저자를 입력하세요" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
          style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          검색
        </button>
      </form>

      {/* 도서 목록 테이블 카드 */}
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #eaeaea' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eaeaea', color: '#555', fontSize: '14px' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>제목</th>
              <th style={{ padding: '15px' }}>저자</th>
              <th style={{ padding: '15px' }}>출판사</th>
              <th style={{ padding: '15px' }}>재고</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                  등록된 도서가 없습니다.
                </td>
              </tr>
            ) : (
              books.map(book => (
                <tr key={book.id} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px' }}>
                  <td style={{ padding: '15px', color: '#666' }}>{book.id}</td>
                  <td 
                    style={{ padding: '15px', color: '#007bff', cursor: 'pointer', fontWeight: '600' }} 
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    {book.title}
                  </td>
                  <td style={{ padding: '15px', color: '#333' }}>{book.author}</td>
                  <td style={{ padding: '15px', color: '#666' }}>{book.publisher || '-'}</td>
                  <td style={{ padding: '15px', color: '#333' }}>{book.stock} 권</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    {token && (
                      <>
                        <button 
                          onClick={() => navigate(`/books/edit/${book.id}`)} 
                          style={{ padding: '6px 12px', marginRight: '6px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => handleDelete(book.id)} 
                          style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default BookList;