'use client';
import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import InputUI, { InputPasswordUI } from '~/components/InputUI';
import ButtonUI from '~/components/ButtonUI';

const InfoPage = () => {
   return (
      <section className='section-card'>
         <div className='flex'>
            <div className='flex basis-4/12 flex-col items-center justify-center gap-3'>
               <div className='w-3/5'>
                  <picture className='image-cover border-item aspect-square rounded-full'>
                     <Image
                        width={300}
                        height={300}
                        src='/assets/default-avatar.jpg'
                        alt='avatar image'
                     />
                  </picture>
               </div>
               <ButtonUI
                  className='bg-[--green-color]'
                  color='primary'
                  onClick={() => toast('Tính năng đang phát triển')}
               >
                  Cập nhật ảnh đại diện
               </ButtonUI>
            </div>
            <div className='basis-8/12 space-y-5'>
               <div>
                  <h2 className='mb-2 text-lg font-medium'>Thông tin cá nhân</h2>
                  <div className='grid grid-cols-2 gap-3'>
                     <InputUI label='Họ và tên' />
                     <InputUI label='Số điện thoại' />
                     <InputUI label='Địa chỉ' className='col-span-2' />
                  </div>
               </div>
               <div className='flex justify-end'>
                  <ButtonUI className='w-40 bg-[--green-color]' color='primary'>
                     Cập nhật
                  </ButtonUI>
               </div>
               <div>
                  <h2 className='mb-2 text-lg font-medium'>Tài khoản</h2>
                  <div className='grid grid-cols-2 gap-3'>
                     <InputUI
                        label='Tên đăng nhập'
                        className='col-span-2'
                        disabled
                        variant='faded'
                     />
                     <InputPasswordUI type='password' label='Mật khẩu' />
                     <InputPasswordUI type='password' label='Nhập lại mật khẩu' />
                  </div>
               </div>
               <div className='flex justify-end'>
                  <ButtonUI className='w-40 bg-[--green-color]' color='primary'>
                     Đổi mật khẩu
                  </ButtonUI>
               </div>
            </div>
         </div>
      </section>
   );
};

export default InfoPage;
