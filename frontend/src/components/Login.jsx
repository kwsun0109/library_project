import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await api.post('/auth/login', form);
      // 서버에서 받은 JWT 토큰과 이메일 저장
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
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
        maxWidth: '440px', 
        padding: '40px 35px', 
        background: '#ffffff', 
        borderRadius: '16px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginBottom: '8px', textAlign: 'center', color: '#1a1a1a', fontSize: '26px', fontWeight: '700' }}>
          환영합니다! 👋
        </h2>
        <p style={{ marginBottom: '30px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
          서비스를 이용하려면 로그인이 필요해요.
        </p>

        {error && (
          <div style={{ 
            color: '#d9534f', 
            background: '#fdf7f7', 
            border: '1px solid #f5c6cb', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            fontSize: '13px', 
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>이메일</label>
            <input 
              name="email" 
              type="email" 
              placeholder="example@email.com" 
              value={form.email} 
              onChange={handleChange} 
              required 
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                backgroundColor: '#fafafa'
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
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>비밀번호</label>
            <input 
              name="password" 
              type="password" 
              placeholder="비밀번호를 입력하세요" 
              value={form.password} 
              onChange={handleChange} 
              required 
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                border: '1px solid #ddd', 
                fontSize: '14px', 
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                backgroundColor: '#fafafa'
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
          </div>

          <button 
            type="submit" 
            style={{ 
              marginTop: '10px',
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
            }}
            onMouseOver={(e) => e.target.style.background = '#0056b3'}
            onMouseOut={(e) => e.target.style.background = '#007bff'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            로그인
          </button>
        </form>
        
        <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          계정이 없으신가요? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;