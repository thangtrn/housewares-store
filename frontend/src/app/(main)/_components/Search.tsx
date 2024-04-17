'use client';
import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

const Search = () => {
   return (
      <div className='flex w-full'>
         <input
            placeholder='Tìm kiếm sản phẩm'
            type='text'
            className='h-10 w-full rounded-s-md border-2 border-[--blue-color] px-3 py-2 text-sm outline-none'
         />
         <Button color='primary' radius='none' className='rounded-e-md'>
            Tìm kiếm
         </Button>
      </div>
   );
};

export default Search;
