'use client';
import React from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { ShoppingCart } from 'lucide-react';

const CartButton = () => {
   return (
      <Tooltip
         showArrow={true}
         content='Thêm vào giỏ hàng'
         radius='none'
         className='rounded'
         closeDelay={0}
      >
         <Button isIconOnly size='sm' className='rounded'>
            <ShoppingCart size={16} />
         </Button>
      </Tooltip>
   );
};

export default CartButton;
