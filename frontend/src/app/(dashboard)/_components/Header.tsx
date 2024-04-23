import React from 'react';
import BrandLogo from '~/components/BrandLogo';

const Header = () => {
   return (
      <header className='z-30 border-b border-b-[--gray-300-color] bg-white'>
         <div className='flex h-[--header-height] items-center justify-between'>
            {/* LOGO */}
            <BrandLogo className='w-64 px-3 py-2 text-xl' size={40} />
            <div></div>
         </div>
      </header>
   );
};

export default Header;
