// src/services/api.ts
import axios, {
  AxiosError,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import Router from 'next/router';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {'Content-Type': 'application/json'},
});

/**
 * Global api interceptor
 * @param {InternalAxiosRequestConfig} request
 */
const apiInterceptor = async (request: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const errorInterceptor = async (axiosError: AxiosError) => {
  // if (axiosError.response?.status === HttpStatusCode.Unauthorized) {
  //   Router.push({pathname: '/auth/login'});
  //   return Promise.reject(axiosError);
  // }

  return Promise.reject(axiosError);
};

// Request interceptors
api.interceptors.request.use(apiInterceptor);

// Response interceptors
api.interceptors.response.use((res) => res, errorInterceptor);
