import axios from 'axios';

// A URL base da sua API
const API_URL = 'http://localhost:3001/api';

/**
 * Função para obter o cabeçalho de autorização.
 * Por favor, ajuste esta função para pegar o token de onde você o armazena.
 * Exemplo: localStorage.getItem('userToken')
 */
const getAuthHeader = () => {
    const token = localStorage.getItem('userToken'); // Substitua pela sua lógica de token
    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        };
    } else {
        return {};
    }
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar o token em cada requisição
api.interceptors.request.use(
    config => {
        const authHeader = getAuthHeader();
        if (authHeader.Authorization) {
            config.headers['Authorization'] = authHeader.Authorization;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
