import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CartButton from './CartButton';
import { IProduct } from '~/interfaces/product.interfaces';
import formatPrice from '~/utils/formatPrice';

export interface ProductCardProps extends IProduct {}

const ProductCard: React.FC<ProductCardProps> = ({ _id, image, price, title, note }) => {
   return (
      <li className='border-item group flex flex-col rounded-md bg-white hover:shadow-lg'>
         <Link href={`/product/${_id}`} className='flex justify-center p-2 md:p-3' title={title}>
            <picture className='image-contain transition-ease aspect-square max-h-48 scale-90 group-hover:scale-100'>
               <Image width={600} height={600} src={image} alt='product-item' />
            </picture>
         </Link>
         <div className='flex flex-1 flex-col gap-2 border-t border-[--gray-300-color] p-2 md:p-3'>
            <Link href={`/product/${_id}`} title={title} className='flex-1'>
               <h3 className='line-clamp-2 text-sm font-medium hover:text-[--red-color]'>
                  {title}
               </h3>
            </Link>
            <div className='flex flex-col gap-2'>
               <div className='flex items-end justify-between font-sans text-base font-bold text-[--red-color]'>
                  <p>{formatPrice(price)}</p>
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
         </div>
      </li>
   );
};

export default ProductCard;
