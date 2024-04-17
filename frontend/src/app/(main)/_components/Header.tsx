import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SearchBox from './SearchBox';
import Action from './Action';

const Header = () => {
   return (
      <header className='sticky inset-x-0 top-0 border-b border-b-[--gray-300-color] bg-white'>
         <div className='container mx-auto flex h-16 items-center justify-between'>
            {/* LOGO */}
            <Link href='/' className='flex cursor-pointer items-center gap-2'>
               <Image width={46} height={46} src='/assets/logo.png' alt='logo-brand' />
               <span className='text-2xl font-bold text-[#8CB7F5]'>DMStore</span>
            </Link>

            {/* SEARCH */}
            <SearchBox />

            {/* ACTION */}
            <Action />
         </div>
      </header>
   );
};

export default Header;
