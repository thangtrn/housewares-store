import { LayoutProps } from '~/interfaces/layout.interfaces';
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import tw, { createVariables } from '~/lib/tw';

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
   const variables = createVariables('[--header-height:56px]', '[--sidebar-width:256px]');

   return (
      <div className={tw(variables)}>
         <Header />
         <Sidebar />
         <main className='ml-[--sidebar-width] min-h-screen py-4'>
            <div className='container'>{children}</div>
         </main>
      </div>
   );
};

export default RootLayout;
