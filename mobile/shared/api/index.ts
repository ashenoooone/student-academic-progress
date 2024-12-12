import axios from 'axios';
import SecureStoreService from '../lib/secure-store-class';
import { SECURE_STORE_KEYS } from '../constants/secure-store-keys';

const $api = axios.create({
  baseURL: 'https://api.example.com',
});

$api.interceptors.request.use(
  async (config) => {
    const token = SecureStoreService.getValue(
      SECURE_STORE_KEYS.jwt
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
    
    ;
  }
);

export default $api;
