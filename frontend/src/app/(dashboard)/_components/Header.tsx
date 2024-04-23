import React from 'react';
import BrandLogo from '~/components/BrandLogo';

const Header = () => {
   return (
      <header className='sticky inset-x-0 top-0 z-30 border-b border-b-[--gray-300-color] bg-white'>
         <div className='flex h-[--header-height] items-center justify-between'>
            {/* LOGO */}
            <BrandLogo className='px-3 py-2 text-xl' size={40} />
            <div>123123</div>
         </div>
      </header>
   );
};

export default Header;
