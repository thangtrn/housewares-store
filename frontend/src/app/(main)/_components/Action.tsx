'use client';
import { Badge } from '@nextui-org/react';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import ButtonUI from '~/components/ButtonUI';
import Link from 'next/link';

const Action = () => {
   return (
      <div className='flex items-center gap-4'>
         <Badge color='danger' content={5} shape='circle'>
            <ButtonUI isIconOnly size='md' radius='sm' variant='light'>
               <ShoppingCart className='fill-current' size={24} />
            </ButtonUI>
         </Badge>
         <ButtonUI color='primary' radius='sm'>
            <Link href='/user'>Đăng nhập</Link>
         </ButtonUI>
      </div>
   );
};

export default Action;
