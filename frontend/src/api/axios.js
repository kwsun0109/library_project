import axios from 'axios';

const api = axios.create({
  // 도커의 Nginx 프록시와 로컬 개발 환경을 모두 지원하려면 빈 문자열('') 또는 '/api'로 설정
  baseURL: '/api', 
});

// 요청을 보내기 전에 로컬 스토리지의 토큰을 헤더에 자동으로 포함시킴
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;