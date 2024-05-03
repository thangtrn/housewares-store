'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import axiosInstance from '~/axios/axiosInstance';
import useStores from '~/stores/stores';

interface ClientLayoutProps {
   children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
   const { user, setUser } = useStores();
   const { data } = useQuery({
      queryKey: ['/auth/me'],
      queryFn: async () => {
         const res = await axiosInstance.get('/auth/me');
         return res?.data?.metadata;
      }
   });

   console.log('🚀 ~ user:', user);

   useEffect(() => {
      setUser(data);
   }, [data, setUser]);

   return children;
};

export default ClientLayout;
