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

  if (error) return <div style={{ color: '#d9534f', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  if (!book) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>불러오는 중...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: '20px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '12px' }}>
        🔍 도서 상세 정보
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
        <DetailItem label="고유 번호 (ID)" value={book.id} />
        <DetailItem label="도서 제목" value={book.title} />
        <DetailItem label="저자" value={book.author} />
        <DetailItem label="출판사" value={book.publisher || '정보 없음'} />
        <DetailItem label="ISBN" value={book.isbn} />
        <DetailItem label="출판일" value={book.publicationDate || '정보 없음'} />
        <DetailItem label="재고 수량" value={`${book.stock} 권`} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate(`/books/edit/${book.id}`)} style={editBtnStyle}>수정하기</button>
        <button onClick={() => navigate('/')} style={backBtnStyle}>목록으로</button>
      </div>
    </div>
  );
}

// 상세 정보 한 줄 컴포넌트
function DetailItem({ label, value }) {
  return (
    <div style={{ display: 'flex', padding: '12px 15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
      <span style={{ width: '120px', fontWeight: '600', color: '#555', fontSize: '14px' }}>{label}</span>
      <span style={{ flex: 1, color: '#333', fontSize: '14px' }}>{value}</span>
    </div>
  );
}

const editBtnStyle = {
  flex: 1,
  padding: '12px',
  background: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
};

const backBtnStyle = {
  flex: 1,
  padding: '12px',
  background: '#6c757d',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
};

export default BookDetail;