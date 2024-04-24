'use client';
import React from 'react';
import {
   Badge,
   Button,
   Dropdown,
   DropdownTrigger,
   DropdownMenu,
   DropdownItem,
   Avatar
} from '@nextui-org/react';
import { Bell } from 'lucide-react';
import BrandLogo from '~/components/BrandLogo';
import Notification from './Notification';

const Header = () => {
   return (
      <header className='sticky inset-x-0 top-0 z-30 border-b border-b-[--gray-300-color] bg-white'>
         <div className='flex h-[--header-height]'>
            {/* LOGO */}
            <BrandLogo className='w-[--sidebar-width] px-3 text-xl' size={40} href='/user' />
            <div className='flex flex-1 items-center justify-between px-4'>
               <div></div>
               <div className='flex gap-4'>
                  <Notification />

                  <Dropdown placement='bottom-end' className='rounded-md'>
                     <DropdownTrigger>
                        <Avatar
                           as='button'
                           className='border-2 border-[--blue-color] transition-transform'
                           src='/assets/default-avatar.jpg'
                        />
                     </DropdownTrigger>
                     <DropdownMenu
                        aria-label='Static Actions'
                        variant='flat'
                        itemClasses={{ base: 'rounded' }}
                     >
                        <DropdownItem key='info' href='/user'>
                           Thông tin cá nhân
                        </DropdownItem>
                        <DropdownItem key='purchase' href='/user/purchase'>
                           Đơn hàng đã mua
                        </DropdownItem>
                        <DropdownItem key='edit'>Đăng xuất</DropdownItem>
                     </DropdownMenu>
                  </Dropdown>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
