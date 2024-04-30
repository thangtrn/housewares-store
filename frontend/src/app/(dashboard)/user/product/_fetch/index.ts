import axiosInstance from '~/axios/axiosInstance';

export const fetchProducts = async ({ page, limit, filter }: any) => {
   const response = await axiosInstance.get('/products', {
      params: {
         page,
         limit,
         filter
      }
   });
   return { result: response?.data?.metadata, pagination: response?.data?.pagination };
};

export const createProduct = ({ name, image }: any) => {
   const formData = new FormData();
   formData.append('name', name);
   formData.append('image', image?.[0]);
   return axiosInstance.post('/products', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};

export const updateProduct = ({ _id, name, image }: any) => {
   const formData = new FormData();
   formData.append('_id', _id);
   formData.append('name', name);
   formData.append('image', image?.[0]);
   return axiosInstance.put('/products', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};

export const deleteProduct = (_id: any) => {
   return axiosInstance.delete(`/products/${_id}`);
};
