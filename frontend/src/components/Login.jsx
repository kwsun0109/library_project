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
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>🔐 로그인</h2>
      {error && <div style={{ color: '#d9534f', background: '#fdf7f7', border: '1px solid #f5c6cb', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          name="email" 
          type="email" 
          placeholder="이메일" 
          value={form.email} 
          onChange={handleChange} 
          required 
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="비밀번호" 
          value={form.password} 
          onChange={handleChange} 
          required 
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
          로그인
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        계정이 없으신가요? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>회원가입하기</Link>
      </div>
    </div>
  );
}

export default Login;