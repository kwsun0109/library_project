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
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 상단 타이틀 및 인증 버튼 영역 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', background: '#fff', padding: '20px 30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: 0, color: '#1a1a1a', fontSize: '24px', fontWeight: '700' }}>📚 도서 관리 시스템</h2>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {token ? (
              <>
                <span style={{ fontSize: '14px', color: '#555', fontWeight: '500' }}>👤 <b>{userEmail}</b>님</span>
                <button 
                  onClick={() => navigate('/books/new')} 
                  style={{ padding: '10px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,123,255,0.25)', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.target.style.background = '#0056b3'}
                  onMouseOut={(e) => e.target.style.background = '#007bff'}
                >
                  + 새 도서 등록
                </button>
                <button 
                  onClick={handleLogout} 
                  style={{ padding: '10px 18px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(108,117,125,0.25)', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.target.style.background = '#5a6268'}
                  onMouseOut={(e) => e.target.style.background = '#6c757d'}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')} 
                  style={{ padding: '10px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,123,255,0.25)', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.target.style.background = '#0056b3'}
                  onMouseOut={(e) => e.target.style.background = '#007bff'}
                >
                  로그인
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  style={{ padding: '10px 18px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(40,167,69,0.25)', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.target.style.background = '#218838'}
                  onMouseOut={(e) => e.target.style.background = '#28a745'}
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>

        {/* 서버 에러 메시지 */}
        {error && (
          <div style={{ color: '#d9534f', background: '#fdf7f7', border: '1px solid #f5c6cb', padding: '15px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* 검색 바 영역 */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '25px', background: '#fff', padding: '20px 30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <input 
            type="text" 
            placeholder="검색할 도서 제목 또는 저자를 입력하세요" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              fontSize: '14px', 
              outline: 'none', 
              backgroundColor: '#fafafa',
              transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#007bff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.15)';
              e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.boxShadow = 'none';
              e.target.style.backgroundColor = '#fafafa';
            }}
          />
          <button 
            type="submit" 
            style={{ padding: '0 24px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 10px rgba(108,117,125,0.25)', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.target.style.background = '#5a6268'}
            onMouseOut={(e) => e.target.style.background = '#6c757d'}
          >
            검색
          </button>
        </form>

        {/* 도서 목록 테이블 카드 */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eaeaea', color: '#555', fontSize: '14px' }}>
                <th style={{ padding: '18px 20px' }}>ID</th>
                <th style={{ padding: '18px 20px' }}>제목</th>
                <th style={{ padding: '18px 20px' }}>저자</th>
                <th style={{ padding: '18px 20px' }}>출판사</th>
                <th style={{ padding: '18px 20px' }}>재고</th>
                <th style={{ padding: '18px 20px', textAlign: 'center' }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: '15px' }}>
                    등록된 도서가 없습니다.
                  </td>
                </tr>
              ) : (
                books.map(book => {
                  const isMyBook = book.email === userEmail;

                  return (
                    <tr 
                      key={book.id} 
                      style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px', transition: 'background-color 0.15s' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '18px 20px', color: '#666' }}>{book.id}</td>
                      <td 
                        style={{ 
                          padding: '18px 20px', 
                          color: isMyBook ? '#007bff' : '#333', 
                          cursor: isMyBook ? 'pointer' : 'default', 
                          fontWeight: '600' 
                        }} 
                        onClick={() => {
                          if (isMyBook) {
                            navigate(`/books/edit/${book.id}`);
                          } else {
                            alert('본인이 등록한 도서만 수정할 수 있습니다.');
                          }
                        }}
                      >
                        {book.title}
                      </td>
                      <td style={{ padding: '18px 20px', color: '#333' }}>{book.author}</td>
                      <td style={{ padding: '18px 20px', color: '#666' }}>{book.publisher || '-'}</td>
                      <td style={{ padding: '18px 20px', color: '#333' }}>{book.stock} 권</td>
                      <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                        {/* 현재 로그인한 사용자의 이메일과 도서 등록자의 이메일이 같을 때만 수정/삭제 버튼 노출 */}
                        {token && isMyBook && (
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                            <button 
                              onClick={() => navigate(`/books/edit/${book.id}`)} 
                              style={{ padding: '6px 14px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
                            >
                              수정
                            </button>
                            <button 
                              onClick={() => handleDelete(book.id)} 
                              style={{ padding: '6px 14px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default BookList;