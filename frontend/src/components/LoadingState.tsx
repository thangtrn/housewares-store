'use client';
import { Spinner } from '@nextui-org/react';
import React from 'react';

const LoadingState = () => {
   return (
      <div className='flex min-h-72 items-center justify-center'>
         <Spinner size='lg' />
      </div>
   );
};

export default LoadingState;
