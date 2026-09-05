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
          계정 만들기 ✨
        </h2>
        <p style={{ marginBottom: '30px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
          간단한 정보를 입력하고 서비스를 시작해보세요.
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
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>이메일 (아이디)</label>
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
                e.target.style.borderColor = '#28a745';
                e.target.style.boxShadow = '0 0 0 3px rgba(40,167,69,0.15)';
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
              placeholder="6자 이상 입력해주세요" 
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
                e.target.style.borderColor = '#28a745';
                e.target.style.boxShadow = '0 0 0 3px rgba(40,167,69,0.15)';
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
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>사용자 이름</label>
            <input 
              name="name" 
              type="text" 
              placeholder="이름을 입력하세요" 
              value={form.name} 
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
                e.target.style.borderColor = '#28a745';
                e.target.style.boxShadow = '0 0 0 3px rgba(40,167,69,0.15)';
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
              background: '#28a745', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '600', 
              cursor: 'pointer', 
              fontSize: '15px',
              boxShadow: '0 4px 10px rgba(40,167,69,0.25)',
              transition: 'background 0.2s, transform 0.1s'
            }}
            onMouseOver={(e) => e.target.style.background = '#218838'}
            onMouseOut={(e) => e.target.style.background = '#28a745'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            가입하기
          </button>
        </form>
        
        <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          이미 계정이 있으신가요? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;