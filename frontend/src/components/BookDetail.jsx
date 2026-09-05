import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function BookDetail() {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => {
        console.error(err);
        setError('도서 상세 정보를 불러오지 못했습니다.');
      });
  }, [id]);

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div style={{ color: '#d9534f', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center', fontWeight: '500' }}>
          {error}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div style={{ color: '#666', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '520px', 
        padding: '40px 35px', 
        background: '#ffffff', 
        borderRadius: '16px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginBottom: '25px', textAlign: 'center', color: '#1a1a1a', fontSize: '24px', fontWeight: '700', borderBottom: '2px solid #f0f0f0', paddingBottom: '16px' }}>
          📖 도서 상세 정보
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
          <DetailItem label="고유 번호 (ID)" value={book.id} />
          <DetailItem label="도서 제목" value={book.title} />
          <DetailItem label="저자" value={book.author} />
          <DetailItem label="출판사" value={book.publisher || '정보 없음'} />
          <DetailItem label="ISBN" value={book.isbn} />
          <DetailItem label="출판일" value={book.publicationDate || '정보 없음'} />
          <DetailItem label="재고 수량" value={`${book.stock} 권`} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => navigate(`/books/edit/${book.id}`)} 
            style={editBtnStyle}
            onMouseOver={(e) => e.target.style.background = '#218838'}
            onMouseOut={(e) => e.target.style.background = '#28a745'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            수정하기
          </button>
          <button 
            onClick={() => navigate('/')} 
            style={backBtnStyle}
            onMouseOver={(e) => e.target.style.background = '#5a6268'}
            onMouseOut={(e) => e.target.style.background = '#6c757d'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

// 상세 정보 한 줄 컴포넌트
function DetailItem({ label, value }) {
  return (
    <div style={{ display: 'flex', padding: '12px 16px', background: '#fafafa', borderRadius: '8px', border: '1px solid #eee' }}>
      <span style={{ width: '130px', fontWeight: '600', color: '#555', fontSize: '14px' }}>{label}</span>
      <span style={{ flex: 1, color: '#222', fontSize: '14px', wordBreak: 'break-all' }}>{value}</span>
    </div>
  );
}

const editBtnStyle = {
  flex: 1,
  padding: '14px',
  background: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '15px',
  boxShadow: '0 4px 10px rgba(40,167,69,0.25)',
  transition: 'background 0.2s, transform 0.1s'
};

const backBtnStyle = {
  flex: 1,
  padding: '14px',
  background: '#6c757d',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '15px',
  boxShadow: '0 4px 10px rgba(108,117,125,0.25)',
  transition: 'background 0.2s, transform 0.1s'
};

export default BookDetail;