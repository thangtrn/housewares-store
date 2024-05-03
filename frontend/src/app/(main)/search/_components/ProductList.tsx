'use client';
import { Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import ProductCard from '~/app/(main)/_components/ProductCard/ProductCard';
import { fetchProductSearch } from '../../product/[_id]/_fetch';
import { IPagination } from '~/interfaces/pagination.interfaces';
import { IProduct } from '~/interfaces/schema.interfaces';
import { ProductQueryData } from '~/app/(dashboard)/user/product/page';
import LoadingState from '~/components/LoadingState';
import tw from '~/lib/tw';

const ProductList: React.FC = () => {
   const searchParams = useSearchParams();
   const filter = {
      name: searchParams.get('query') || '',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 25,
      fromPrice: Number(searchParams.get('fromPrice')) || null,
      toPrice: Number(searchParams.get('toPrice')) || null,
      sort: searchParams.get('sort') || 'createdAt'
   };

   const { data, isLoading, isRefetching } = useQuery<ProductQueryData>({
      queryKey: ['/search', filter],
      queryFn: () => fetchProductSearch(filter)
   });

   // console.log(data);

   const handleChangePage = (page) => {};

   return (
      <>
         <div className='border-item mb-4 rounded-md bg-white p-2 text-xl'>
            <h1 className='font-medium'>
               Từ khoá: {filter.name}
               <span className='ml-3 text-lg font-normal text-[--gray-500-color]'>
                  {data?.pagination?.totalItem && `(${data?.pagination?.totalItem} sản phẩm)`}
               </span>
            </h1>
         </div>
         <section className='section border-none bg-transparent'>
            {isLoading || isRefetching ? (
               <LoadingState />
            ) : (
               <>
                  <ul className='grid grid-cols-5 gap-4'>
                     {data?.result.map((item) => <ProductCard key={item._id} {...item} />)}
                  </ul>
                  {/* PAGINATION */}
                  <Pagination
                     showControls
                     classNames={{ item: 'bg-white' }}
                     className={tw('mt-4 flex justify-end', !data && 'invisible')}
                     page={filter.page}
                     total={Number(data?.pagination?.totalPage)}
                     onChange={handleChangePage}
                  />
               </>
            )}
         </section>
      </>
   );
};

export default ProductList;
