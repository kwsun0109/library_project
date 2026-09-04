import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function Signup() {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await api.post('/auth/signup', form);
      alert('회원가입이 완료되었습니다! 로그인 해주세요.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || '회원가입에 실패했습니다. 입력값을 확인해주세요.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>📝 회원가입</h2>
      {error && <div style={{ color: '#d9534f', background: '#fdf7f7', border: '1px solid #f5c6cb', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          name="email" 
          type="email" 
          placeholder="이메일 (아이디)" 
          value={form.email} 
          onChange={handleChange} 
          required 
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="비밀번호 (6자 이상)" 
          value={form.password} 
          onChange={handleChange} 
          required 
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
        />
        <input 
          name="name" 
          type="text" 
          placeholder="사용자 이름" 
          value={form.name} 
          onChange={handleChange} 
          required 
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
          가입하기
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        이미 계정이 있으신가요? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>로그인하기</Link>
      </div>
    </div>
  );
}

export default Signup;