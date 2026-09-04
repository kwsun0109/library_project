import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Vite 프록시를 타기 위한 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔑 핵심: API를 요청하기 전에 로컬 스토리지의 토큰을 가로채서 헤더에 쏙 넣어줌!
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 로그인할 때 저장한 토큰 키 이름
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;