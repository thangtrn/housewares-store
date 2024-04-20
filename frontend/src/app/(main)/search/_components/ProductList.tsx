'use client';
import { Pagination } from '@nextui-org/react';
import React from 'react';
import ProductCard from '~/app/(main)/_components/ProductCard/ProductCard';
import { IProduct } from '~/interfaces/product.interfaces';

interface ProductListProps {
   products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
   return (
      <section className='section border-none'>
         <ul className='grid grid-cols-5 gap-4'>
            {products.map((item) => (
               <ProductCard key={item._id} {...item} />
            ))}
         </ul>
         {/* PAGINATION */}
         <Pagination showControls total={10} initialPage={1} className='mt-4 flex justify-end' />
      </section>
   );
};

export default ProductList;
