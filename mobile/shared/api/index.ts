import axios from 'axios';
import SecureStoreService from '../lib/secure-store-class';
import { SECURE_STORE_KEYS } from '../constants/secure-store-keys';

const $api = axios.create({
  baseURL: 'http://127.0.0.1/',
});

$api.interceptors.request.use(
  async (config) => {
    const token = SecureStoreService.getValue(SECURE_STORE_KEYS.jwt);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await SecureStoreService.deleteValue(SECURE_STORE_KEYS.jwt);
    }
    return Promise.reject(error);
  },
);

export default $api;
