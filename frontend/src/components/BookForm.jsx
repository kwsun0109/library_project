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
        maxWidth: '560px', 
        padding: '40px 35px', 
        background: '#ffffff', 
        borderRadius: '16px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginBottom: '25px', textAlign: 'center', color: '#1a1a1a', fontSize: '24px', fontWeight: '700', borderBottom: '2px solid #f0f0f0', paddingBottom: '16px' }}>
          {isEdit ? '✏️ 도서 정보 수정' : '📖 새 도서 등록'}
        </h2>

        {error && (
          <div style={{ color: '#d9534f', background: '#fdf7f7', border: '1px solid #f5c6cb', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '500', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>도서 제목</label>
            <input 
              name="title" 
              placeholder="책 제목을 입력하세요" 
              value={form.title} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>저자</label>
            <input 
              name="author" 
              placeholder="저자명을 입력하세요" 
              value={form.author} 
              onChange={handleChange} 
              required 
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>출판사</label>
              <input 
                name="publisher" 
                placeholder="출판사" 
                value={form.publisher} 
                onChange={handleChange} 
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>ISBN</label>
              <input 
                name="isbn" 
                placeholder="ISBN 번호" 
                value={form.isbn} 
                onChange={handleChange} 
                required 
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>출판일</label>
              <input 
                name="publicationDate" 
                type="date" 
                value={form.publicationDate || ''} 
                onChange={handleChange} 
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>재고 수량</label>
              <input 
                name="stock" 
                type="number" 
                placeholder="0" 
                value={form.stock} 
                onChange={handleChange} 
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button 
              type="submit" 
              style={primaryBtnStyle}
              onMouseOver={(e) => e.target.style.background = '#0056b3'}
              onMouseOut={(e) => e.target.style.background = '#007bff'}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isEdit ? '수정 완료' : '등록하기'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              style={cancelBtnStyle}
              onMouseOver={(e) => e.target.style.background = '#5a6268'}
              onMouseOut={(e) => e.target.style.background = '#6c757d'}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 공통 인풋 스타일 및 핸들러
const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#fafafa',
  transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
};

const handleFocus = (e) => {
  e.target.style.borderColor = '#007bff';
  e.target.style.boxShadow = '0 0 0 3px rgba(0,123,255,0.15)';
  e.target.style.backgroundColor = '#fff';
};

const handleBlur = (e) => {
  e.target.style.borderColor = '#ddd';
  e.target.style.boxShadow = 'none';
  e.target.style.backgroundColor = '#fafafa';
};

const primaryBtnStyle = {
  flex: 1,
  padding: '14px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '15px',
  boxShadow: '0 4px 10px rgba(0,123,255,0.25)',
  transition: 'background 0.2s, transform 0.1s'
};

const cancelBtnStyle = {
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

export default BookForm;