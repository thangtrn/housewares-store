'use client';
import { Button } from '@nextui-org/react';
import React from 'react';

const ActionGroup = () => {
   return (
      <div className='flex gap-3'>
         <Button
            variant='bordered'
            className='border-1 w-full max-w-40 rounded border-[--blue-color] text-[--blue-color]'
         >
            Thêm vào giỏ hàng
         </Button>
         <Button color='primary' className='w-full max-w-40 rounded bg-[--red-color]'>
            Mua ngay
         </Button>
      </div>
   );
};

export default ActionGroup;
