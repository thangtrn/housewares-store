'use client';
import React, { useState } from 'react';
import { Button, Input, Radio, RadioGroup, Slider } from '@nextui-org/react';
import tw from '~/lib/tw';
import formatPrice from '~/utils/formatPrice';
import { Divider } from '@nextui-org/react';

interface BlockFilterProps {
   title?: string;
   children: React.ReactNode;
   border?: boolean;
   className?: string;
   wrapperClassName?: string;
}

const BlockFilter: React.FC<BlockFilterProps> = ({
   title,
   children,
   border = false,
   wrapperClassName,
   className
}) => {
   return (
      <div className={tw('pb-2', wrapperClassName, border && 'border-b border-[--gray-300-color]')}>
         {title && <h4 className='text-sm font-medium'>{title}</h4>}
         <div className={tw('mt-2', className)}>{children}</div>
      </div>
   );
};

interface DisplayPrice {
   price: number;
}

const DisplayPrice: React.FC<DisplayPrice> = ({ price }) => {
   return (
      <span className='w-full appearance-none rounded border px-2 py-1 text-center text-xs outline-none'>
         {formatPrice(price)}
      </span>
   );
};

const Fillterbar = () => {
   const [priceValue, setPriceValue] = useState<number[]>([0, 20000000]);

   return (
      <div className={'section sticky top-[calc(64px+16px)] flex flex-col gap-2 bg-white p-3'}>
         <BlockFilter title='Khoảng giá' border>
            <div className='mb-2 flex items-center'>
               <DisplayPrice price={priceValue[0]} />
               <Divider className='w-2' />
               <DisplayPrice price={priceValue[1]} />
            </div>
            <Slider
               showTooltip
               aria-label='Khoảng giá'
               size='sm'
               minValue={0}
               onChange={(value) => setPriceValue(value as number[])}
               value={priceValue}
               maxValue={20000000}
               defaultValue={priceValue}
               tooltipProps={{
                  placement: 'bottom'
               }}
            />
         </BlockFilter>
         <BlockFilter title='Sắp xếp' border>
            <RadioGroup size='sm'>
               <Radio value='asc'>Gía tăng đần</Radio>
               <Radio value='desc'>Giá giảm dần</Radio>
               <Radio value='date'>Ngày ra mắt</Radio>
               <Radio value='pupulate'>Bán chạy</Radio>
            </RadioGroup>
         </BlockFilter>
         <BlockFilter className='flex justify-end gap-2' wrapperClassName='pb-0'>
            <Button size='sm' variant='bordered' className='border-1 rounded'>
               Xoá bộ lọc
            </Button>
            <Button size='sm' color='primary' className='rounded'>
               Áp dụng
            </Button>
         </BlockFilter>
      </div>
   );
};

export default Fillterbar;
