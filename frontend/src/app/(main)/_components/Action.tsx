'use client';
import { Badge } from '@nextui-org/react';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ButtonUI from '~/components/ButtonUI';

const Action = () => {
   const router = useRouter();

   return (
      <div className='flex items-center gap-4'>
         <Badge color='danger' content={5} shape='circle'>
            <ButtonUI isIconOnly size='md' radius='sm' variant='light'>
               <ShoppingCart className='fill-current' size={24} />
            </ButtonUI>
         </Badge>
         <ButtonUI color='primary' radius='sm' onClick={() => router.push('/user')}>
            Đăng nhập
         </ButtonUI>
      </div>
   );
};

export default Action;
