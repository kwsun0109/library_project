import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function BookForm() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    publicationDate: '',
    stock: 0,
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      api.get(`/books/${id}`)
        .then(res => setForm(res.data))
        .catch(err => {
          console.error(err);
          setError('도서 정보를 불러오지 못했습니다.');
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (isEdit) {
        await api.put(`/books/${id}`, form);
      } else {
        await api.post('/books', form);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('서버 통신 실패: 요청을 처리하지 못했습니다.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: '20px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '12px' }}>
        {isEdit ? '✏️ 도서 정보 수정' : '📖 새 도서 등록'}
      </h2>

      {error && (
        <div style={{ color: '#d9534f', background: '#fdf7f7', border: '1px solid #f5c6cb', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555', fontSize: '14px' }}>도서 제목</label>
          <input name="title" placeholder="책 제목을 입력하세요" value={form.title} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555', fontSize: '14px' }}>저자</label>
          <input name="author" placeholder="저자명을 입력하세요" value={form.author} onChange={handleChange} required style={inputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555', fontSize: '14px' }}>출판사</label>
            <input name="publisher" placeholder="출판사" value={form.publisher} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555', fontSize: '14px' }}>ISBN</label>
            <input name="isbn" placeholder="ISBN 번호" value={form.isbn} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555', fontSize: '14px' }}>출판일</label>
            <input name="publicationDate" type="date" value={form.publicationDate || ''} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555', fontSize: '14px' }}>재고 수량</label>
            <input name="stock" type="number" placeholder="0" value={form.stock} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={primaryBtnStyle}>{isEdit ? '수정 완료' : '등록하기'}</button>
          <button type="button" onClick={() => navigate('/')} style={cancelBtnStyle}>취소</button>
        </div>
      </form>
    </div>
  );
}

// 공통 스타일 객체
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const primaryBtnStyle = {
  flex: 1,
  padding: '12px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
};

const cancelBtnStyle = {
  flex: 1,
  padding: '12px',
  background: '#6c757d',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
};

export default BookForm;