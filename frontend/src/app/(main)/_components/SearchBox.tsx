'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Button, Divider } from '@nextui-org/react';
import { Search, Store } from 'lucide-react';
import { useOnClickOutside } from 'usehooks-ts';
import { motion, AnimatePresence } from 'framer-motion';

interface SuggestItemProps {
   content: string;
   href?: string;
}

const SuggestItem: React.FC<SuggestItemProps> = ({ content, href = '/' }) => {
   return (
      <Link href={href} className='flex items-center px-4 py-2 transition-all ease-linear hover:bg-[--gray-300-color]'>
         <Search size={20} className='flex-shrink-0' />
         <span className='ml-2 truncate'>{content}</span>
      </Link>
   );
};

const SearchBox = () => {
   const ref = useRef<HTMLDivElement>(null);
   const [visible, setVisible] = useState<boolean>(false);
   const [searchText, setSearchText] = useState<string>('');

   const show = () => setVisible(true);
   const hide = () => setVisible(false);

   useOnClickOutside(ref, () => hide());

   return (
      <div className='relative w-full max-w-lg'>
         <div className='flex'>
            <input
               onFocus={show}
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               placeholder='Tìm kiếm sản phẩm'
               type='text'
               className='h-10 w-full rounded-s-md border-2 border-[--blue-color] px-3 py-2 text-sm outline-none'
            />
            <Button color='primary' radius='none' className='rounded-e-md'>
               Tìm kiếm
            </Button>
         </div>

         {/* SUGGEST LIST */}
         <AnimatePresence>
            {visible && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.6, translateY: '12px' }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                  ref={ref}
                  className='header__dropdown_shadow absolute inset-x-0 top-full w-full rounded-lg border border-[var(--gray-300-color)] bg-white'
               >
                  <ul className='max-h-[80vh] overflow-y-auto py-2 text-sm'>
                     <div className='flex items-center overflow-hidden text-nowrap px-4 py-2 transition-all ease-linear'>
                        <Store size={20} className='flex-shrink-0' />
                        <span className='ml-2'>Tìm kiếm &quot;</span>
                        <span className='truncate font-bold text-[--red-color]'>{searchText}</span>
                        <span>&quot;</span>
                     </div>
                     {searchText.length > 0 && (
                        <>
                           <Divider />
                           <SuggestItem content='22222222222222222222222222222222222222222222222sssssssssssssssssssss' />
                           <SuggestItem content='2' />
                           <SuggestItem content='4' />
                        </>
                     )}
                  </ul>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default SearchBox;
