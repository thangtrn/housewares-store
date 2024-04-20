'use client';
import React from 'react';
import Breadcrumb from '../_components/Breadcrumb';
import ProductList from './_components/ProductList';
import { PRODUCT_LIST } from '../(home)/_data';
import Fillterbar from './_components/Fillterbar';

const SearchPage = () => {
   return (
      <>
         <Breadcrumb data={['Tìm kiếm']} className='mb-5' />
         <div className='flex gap-2'>
            <nav className='basis-2/12'>
               <Fillterbar />
            </nav>
            <section className='basis-10/12'>
               <div className='border-item mb-4 rounded-md bg-white p-2 text-xl'>
                  <h1 className='font-medium'>
                     Từ khoá: Đồ gia dụng{' '}
                     <span className='text-lg font-normal text-[--gray-500-color]'>
                        (10 sản phẩm)
                     </span>
                  </h1>
               </div>
               <ProductList products={PRODUCT_LIST.products} />
            </section>
         </div>
      </>
   );
};

export default SearchPage;
