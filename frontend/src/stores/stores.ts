import { create } from 'zustand';
import { AuthSlice, authSlice } from './authSlice';

const useStores = create<AuthSlice>((...a) => ({
   ...authSlice(...a)
}));

export default useStores;
