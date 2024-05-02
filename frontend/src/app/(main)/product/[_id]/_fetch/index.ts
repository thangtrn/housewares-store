import axiosInstance from '~/axios/axiosInstance';

export const fetchProductById = async (_id: string) => {
   const response = await axiosInstance.get(`/products/${_id}`);
   return response?.data?.metadata;
};

export const fetchProductSuggestion = async () => {
   const response = await axiosInstance.get(`/products/suggestion`);
   return response?.data?.metadata;
};
