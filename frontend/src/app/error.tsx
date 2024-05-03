'use client';
import React from 'react';
import Header from '~/app/(main)/_components/Header';
import Footer from '~/app/(main)/_components/Footer';
import NotFoundTemplate from '~/components/NotFoundTemplate';

const NotFoundPage = () => {
   return (
      <>
         <Header />
         <NotFoundTemplate title='Đã có lỗi vui lòng thử lại sau' subtitle='' />;
         <Footer />
      </>
   );
};

export default NotFoundPage;
