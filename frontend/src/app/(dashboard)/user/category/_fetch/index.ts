import axiosInstance from '~/axios/axiosInstance';

export const fetchCategory = async () => {
   const response = await axiosInstance.get('/categor');
   return response?.data?.metadata;
};
