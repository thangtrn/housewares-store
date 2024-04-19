import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CartButton from './CartButton';
import { IProduct } from '~/interfaces/product.interfaces';
import formatPrice from '~/utils/formatPrice';

export interface ProductCardProps extends IProduct {}

const ProductCard: React.FC<ProductCardProps> = ({ _id, image, price, title, note }) => {
   return (
      <li className='border-item group rounded-md bg-white hover:shadow-lg'>
         <Link
            href={`/product/${_id}`}
            className='transition-ease mt-2 flex justify-center p-2 group-hover:-translate-y-2 md:p-3'
            title={title}
         >
            <div className='image-contain aspect-square max-h-48'>
               <Image width={600} height={600} src={image} alt='product-item' />
            </div>
         </Link>
         <div className='border-t border-[--gray-300-color] p-2 md:p-3'>
            <Link href={`/product/${_id}`} title={title}>
               <h3 className='mb-2 line-clamp-2 text-sm font-medium hover:text-[--red-color]'>
                  {title}
               </h3>
            </Link>
            <div className='mb-2 flex items-end justify-between font-sans text-base font-bold text-[--red-color]'>
               <p>{formatPrice(price)}₫</p>
               <CartButton />
            </div>
            {/* NOTE */}
            {note && (
               <div className='border-item overflow-hidden rounded bg-[--light-sky-color] p-1'>
                  <p className='line-clamp-2 text-xs' title={note}>
                     {note}
                  </p>
               </div>
            )}
         </div>
      </li>
   );
};

export default ProductCard;
