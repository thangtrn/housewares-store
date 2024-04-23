import { LayoutProps } from '~/interfaces/layout.interfaces';
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import tw, { createVariables } from '~/lib/tw';

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
   const variables = createVariables('[--header-height:56px]');

   return (
      <div className={variables}>
         <Header />
         <div className='flex min-h-screen w-full'>
            <Sidebar />
            <div className='flex-1'>{children}</div>
         </div>
      </div>
   );
};

export default RootLayout;
