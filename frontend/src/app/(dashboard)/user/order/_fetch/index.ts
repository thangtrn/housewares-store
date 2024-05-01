import axiosInstance from '~/axios/axiosInstance';

export const fetchOrder = async ({
   page,
   limit,
   orderBy
}: {
   page?: number;
   limit?: number;
   orderBy?: string;
}) => {
   const response = await axiosInstance.get('/order', {
      params: {
         page,
         limit,
         orderBy
      }
   });
   return { result: response?.data?.metadata, pagination: response?.data?.pagination };
};

export const createOrder = ({ name, image }: any) => {
   const formData = new FormData();
   formData.append('name', name);
   formData.append('image', image?.[0]);
   return axiosInstance.post('/order', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   });
};

export const updateOrder = ({ _id, status }: any) => {
   return axiosInstance.put('/order', { _id, status });
};

export const deleteOrder = (_id: any) => {
   return axiosInstance.delete(`/order/${_id}`);
};
