'use client';
import { Badge, Button } from '@nextui-org/react';
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Action = () => {
   return (
      <div className='flex items-center gap-4'>
         <Badge color='danger' content={5} shape='circle'>
            <Button isIconOnly size='md' radius='sm' variant='light'>
               <ShoppingCart className='fill-current' size={24} />
            </Button>
         </Badge>
         <Button color='primary' radius='sm'>
            Đăng nhập
         </Button>
      </div>
   );
};

export default Action;
