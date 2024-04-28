import axiosInstance from '~/axios/axiosInstance';

export const fetchCategory = async () => {
   const response = await axiosInstance.get('/category');
   return response?.data?.metadata;
};
