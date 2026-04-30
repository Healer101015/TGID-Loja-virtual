import axios from 'axios';

export const api = axios.create({
    // O json-server roda por padrão na porta 3000 ou 3001
    baseURL: 'http://localhost:3001',
});