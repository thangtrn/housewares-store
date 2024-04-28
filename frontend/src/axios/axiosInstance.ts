import axios, { AxiosInstance, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URI,
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
});
console.log('🚀 ~ process.env.API_URI:', process.env.API_URI);

// Interceptors để xử lý các request trước khi chúng được gửi
axiosInstance.interceptors.request.use(
   (config: any) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Interceptors để xử lý các response trước khi chúng được trả về
axiosInstance.interceptors.response.use(
   (response: AxiosResponse) => {
      return response;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default axiosInstance;
