import axiosInstance from '~/axios/axiosInstance';
import { ICategory } from '~/interfaces/schema.interfaces';

export const fetchCategory = async () => {
   const response = await axiosInstance.get('/category');
   return response?.data?.metadata;
};

export const createCategory = ({ name, image }: any) => {
   const formData = new FormData();
   formData.append('name', name);
   formData.append('image', image?.[0]);
   return axiosInstance.post('/category', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};
