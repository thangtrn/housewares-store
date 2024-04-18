import React from 'react';
import Category from './_components/Category';
import EmblaCarousel from './_components/EmblaCarousel/EmblaCarousel';

const slidesImageUrl = ['/assets/banner.png', '/assets/banner.png', '/assets/banner.png', '/assets/banner.png'];

const HomePage = () => {
   return (
      <>
         {/* CAROUSEL */}
         <section className='flex gap-4 rounded-md border border-[--gray-300-color] px-4 py-5'>
            {/* CATEGORY */}
            <Category />

            {/* CAROUSEL */}
            <div className='flex-1'>
               <EmblaCarousel slides={slidesImageUrl} />
            </div>
         </section>
      </>
   );
};

export default HomePage;
