import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import tw from '~/lib/tw';

interface BrandLogoProps {
   className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
   return (
      <Link href='/' className={tw('flex w-fit cursor-pointer items-center gap-2', className)}>
         <Image width={46} height={46} src='/assets/logo.png' alt='logo-brand' />
         <span className='text-2xl font-bold text-[#8CB7F5]'>DMStore</span>
      </Link>
   );
};

export default BrandLogo;
