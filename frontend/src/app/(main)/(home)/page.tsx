import React from 'react';
import Category from './_components/Category';
import EmblaCarousel from './_components/EmblaCarousel';
import BlockCategoryGroup from './_components/BlockCategoryGroup';
import { SLIDES_IMAGE_URL, CATEGORY_BLOCK_DATA, PRODUCT_LIST, CATEGORIES } from './_data';
import ProductList from './_components/ProductList';

const HomePage = () => {
   return (
      <>
         {/* CAROUSEL */}
         <section className='section flex py-4'>
            {/* CATEGORY */}
            <Category categories={CATEGORIES} />

            {/* CAROUSEL */}
            <div className='min-h-[22.5rem] basis-9/12 pr-4'>
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
         <ProductList title={PRODUCT_LIST.title} products={PRODUCT_LIST.products} />

         <ProductList title='Sản phẩm bán chạy' products={PRODUCT_LIST.products} />
      </>
   );
};

export default HomePage;
