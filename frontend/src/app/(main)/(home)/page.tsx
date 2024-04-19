import React from 'react';
import Category from './_components/Category';
import EmblaCarousel from './_components/EmblaCarousel/EmblaCarousel';
import BlockCategoryGroup from './_components/BlockCategoryGroup';
import { SLIDES_IMAGE_URL, CATEGORY_BLOCK_DATA } from './_data';
import ProductList from './_components/ProductList';

const HomePage = () => {
   return (
      <>
         {/* CAROUSEL */}
         <section className='section flex gap-4 px-4 py-5'>
            {/* CATEGORY */}
            <Category />

            {/* CAROUSEL */}
            <div className='flex-1'>
               <EmblaCarousel slides={SLIDES_IMAGE_URL} />
            </div>
         </section>

         {/* BLOCK ITEMS GROUP */}
         <BlockCategoryGroup
            title={CATEGORY_BLOCK_DATA.title}
            thumbnail={CATEGORY_BLOCK_DATA.thumbnail}
            categoryItems={CATEGORY_BLOCK_DATA.categoryItems}
         />

         {/* LIST PRODUCT */}
         <ProductList />
      </>
   );
};

export default HomePage;
