import React from 'react';
import { notFound } from 'next/navigation';
import { ServerProps } from '~/interfaces/server.interfaces';
import Breadcrumb from '../../_components/Breadcrumb';
import EmblaCarousel from './_components/EmblaCarousel';
import BadgeUI from '~/components/BadgeUI';
import { Check, X, Store, ShoppingBag } from 'lucide-react';
import { PRODUCT_DATA } from './data/product';
import formatPrice from '~/utils/formatPrice';
import Table from './_components/Table';
import ActionGroup from './_components/ActionGroup';
import ProductCard from '~/app/(main)/_components/ProductCard/ProductCard';
import { PRODUCT_LIST } from '../../(home)/_data';
import EmptyStates from '~/components/EmptyStates';

const ProductDetailPage: React.FC<ServerProps> = ({}) => {
   return (
      <>
         <Breadcrumb data={['Sản phẩm', 'Áo thun']} className='mb-4' />
         <section className='section-card mb-4 flex gap-4'>
            <div className='flex basis-4/12 md:border-r md:border-[--gray-300-color] md:pr-4'>
               <EmblaCarousel slides={PRODUCT_DATA.images} />
            </div>
            <div className='basis-8/12 space-y-2'>
               <BadgeUI
                  text={PRODUCT_DATA.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  color={PRODUCT_DATA.stock > 0 ? 'success' : 'danger'}
                  variant='flat'
                  startIcon={PRODUCT_DATA.stock > 0 ? <Check size={18} /> : <X size={18} />}
                  classNames={{ base: 'rounded-md' }}
               />

               <h1 className='line-clamp-3 text-2xl font-medium'>{PRODUCT_DATA.title}</h1>

               <ul className='text-md flex items-center text-[#8b96a5]'>
                  <li className='flex items-center gap-1'>
                     <Store size={18} /> Còn {PRODUCT_DATA.stock}
                  </li>
                  <div className='mx-3 h-4 w-[2px] bg-[--gray-300-color]' />
                  <li className='flex items-center gap-1'>
                     <ShoppingBag size={18} /> Đã bán {PRODUCT_DATA.sold}
                  </li>
               </ul>

               <h4 className='text-2xl font-medium text-[--red-color]'>
                  Giá: {formatPrice(PRODUCT_DATA.price)}
               </h4>

               <ActionGroup />

               <div className='!mt-5 border-t border-dashed pt-3'>
                  <h4 className='mb-2 text-xl font-medium'>Thông tin chi tiết</h4>
                  <Table data={PRODUCT_DATA.detail} />
               </div>
            </div>
         </section>
         <section className='flex gap-4'>
            <div className='basis-9/12'>
               <div className='section-card'>
                  <h1 className='mb-2 text-xl font-medium'>Mô tả sản phẩm</h1>
                  {PRODUCT_DATA.description ? (
                     <div dangerouslySetInnerHTML={{ __html: PRODUCT_DATA.description }} />
                  ) : (
                     <EmptyStates subtitle='Mô tả sản phẩm trống' />
                  )}
               </div>
            </div>
            <div className='basis-3/12'>
               <div className='section-card'>
                  {/* sticky top-[calc(64px+16px)] */}
                  <h1 className='mb-2 text-xl font-medium'>Sản phẩm tương tự</h1>
                  <ul className='space-y-4'>
                     {PRODUCT_LIST.products.slice(0, 4).map((item) => (
                        <ProductCard key={item._id} {...item} />
                     ))}
                  </ul>
               </div>
            </div>
         </section>
      </>
   );
};

export default ProductDetailPage;
