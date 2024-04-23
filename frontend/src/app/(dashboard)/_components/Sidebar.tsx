import Link from 'next/link';
import React from 'react';
import tw from '~/lib/tw';

interface SidebarItemProps {
   href: string;
   active: boolean;
   icon: React.ReactNode;
   label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, active, icon, label }) => {
   return (
      <li>
         <Link
            href={href}
            className={tw(
               'transition-linear group flex items-center rounded-md p-2 text-gray-900 hover:bg-[--gray-300-color]',
               active && 'bg-[--gray-300-color]'
            )}
         >
            {icon}
            <span className='ms-3'>{label}</span>
         </Link>
      </li>
   );
};

const Sidebar = () => {
   return (
      <aside className='fixed bottom-0 left-0 top-[--header-height] h-[calc(100vh-var(--header-height))] w-[--sidebar-width] overflow-y-auto border-r border-[--gray-300-color] bg-white'>
         <div className='h-full overflow-y-auto bg-gray-50 px-3 py-4'>
            <ul className='space-y-2 font-medium'>
               <SidebarItem
                  active={true}
                  icon={
                     <svg
                        className='transition-linear h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 22 21'
                     >
                        <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                        <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                     </svg>
                  }
                  href='/user'
                  label='Cá nhân'
               />
               <SidebarItem
                  active={false}
                  icon={
                     <svg
                        className='transition-linear h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 22 21'
                     >
                        <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                        <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                     </svg>
                  }
                  href='/user'
                  label='Cá nhân'
               />
               <SidebarItem
                  active={false}
                  icon={
                     <svg
                        className='transition-linear h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 22 21'
                     >
                        <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                        <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                     </svg>
                  }
                  href='/user'
                  label='Cá nhân'
               />
            </ul>
         </div>
      </aside>
   );
};

export default Sidebar;
