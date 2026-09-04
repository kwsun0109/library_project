import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 필요시 요청 응답 인터셉터 설정(토큰 주입, 에러 핸들링 등)
api.interceptors.request.use(
    (config) => {
        // localStorage에서 JWT 토큰을 가져와 헤더에 담기
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorizatin = 'Bearer ${token}';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;