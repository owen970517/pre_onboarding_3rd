import axios from 'axios';
import { BASE_URL } from '../constants/api';

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return error;
    }
);