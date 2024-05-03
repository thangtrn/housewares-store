'use client';
import React from 'react';
import Breadcrumb from '../_components/Breadcrumb';
import ProductList from './_components/ProductList';
import Fillterbar from './_components/Fillterbar';
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
   return (
      <>
         <Breadcrumb data={['Tìm kiếm']} className='mb-5' />
         <div className='flex gap-2'>
            <nav className='basis-2/12'>
               <Fillterbar />
            </nav>
            <div className='basis-10/12'>
               <ProductList />
            </div>
         </div>
      </>
   );
};

export default SearchPage;
