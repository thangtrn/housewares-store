'use client';
import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';
import BrandLogo from '~/components/BrandLogo';
import Notification from './Notification';
import Action from '~/app/(dashboard)/_components/Action';

const Header = () => {
   return (
      <header className='sticky inset-x-0 top-0 z-30 border-b border-b-[--gray-300-color] bg-white'>
         <div className='flex h-[--header-height]'>
            <BrandLogo className='w-[--sidebar-width] px-3 text-xl' size={40} href='/user' />

            <div className='container flex flex-1 items-center justify-end px-4'>
               <Action />
            </div>
         </div>
      </header>
   );
};

export default Header;
