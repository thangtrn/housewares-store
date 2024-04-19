import React from 'react';
import Link from 'next/link';

interface CategoryItemProps {
   href: string;
   content: string;
}

const data: CategoryItemProps[] = [
   {
      href: '/',
      content: 'Automobiles'
   },
   {
      href: '/',
      content: 'Clothes and wear'
   },
   {
      href: '/',
      content: 'Home interios'
   },
   {
      href: '/',
      content: 'Computer and tech'
   },
   {
      href: '/',
      content: 'Tool, equipments'
   },
   {
      href: '/',
      content: 'Sports and outdoor'
   },
   {
      href: '/',
      content: 'Animal and pets'
   },
   {
      href: '/',
      content: 'Machinery tools'
   },
   {
      href: '/',
      content: 'More category'
   }
];

const CategoryItem: React.FC<CategoryItemProps> = ({ href, content }) => {
   return (
      <li>
         <Link
            href={href}
            className='flex h-10 items-center rounded-md px-3 text-base transition-all duration-100 hover:bg-[--light-sky-color]'
         >
            {content}
         </Link>
      </li>
   );
};

const Category = () => {
   return (
      <ul className='basis-64'>
         {data.map((category, index) => (
            <CategoryItem key={index} href={category.href} content={category.content} />
         ))}
      </ul>
   );
};

export default Category;
