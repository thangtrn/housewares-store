'use client';
import React, { useState } from 'react';
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Pagination,
   useDisclosure,
   Spinner,
   Input
} from '@nextui-org/react';
import { CirclePlus, Eye, RotateCcw, Search, SquarePen, Trash2 } from 'lucide-react';
import InputUI from '~/components/InputUI';
import ButtonUI from '~/components/ButtonUI';
import ModalUI, { ModalType } from '~/components/ModalUI';
import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from './_fetch';
import { ICategory } from '~/interfaces/schema.interfaces';
import EmptyStates from '~/components/EmptyStates';
import { useForm, SubmitHandler } from 'react-hook-form';

const CategoryPage = () => {
   const {
      data = [],
      isLoading,
      isRefetching,
      refetch
   } = useQuery<ICategory[]>({
      queryKey: ['/category'],
      queryFn: fetchCategory
   });

   const [modalType, setModalType] = useState<ModalType>(null);
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const { register, handleSubmit } = useForm();

   const handleOpen = (modalType?: ModalType) => {
      setModalType(modalType);
      onOpen();
   };

   const onSubmit = (data: any) => {
      console.log('🚀 ~ onSubmit ~ data:', data);
   };

   const renderModal = (modalType: ModalType) => {
      switch (modalType) {
         case 'create':
            return (
               <div>
                  <InputUI label='Tên danh mục' required {...register('name')} />
               </div>
            );

         default:
            return null;
      }
   };

   return (
      <>
         <div className='section-card mb-4 flex justify-between'>
            <div className='flex gap-3'>
               <ButtonUI
                  startContent={<RotateCcw size={16} />}
                  color='primary'
                  className='bg-[--green-color]'
                  onClick={() => {
                     console.log('12123');
                     refetch();
                  }}
               >
                  Làm mới
               </ButtonUI>

               <ButtonUI
                  startContent={<CirclePlus size={16} />}
                  color='primary'
                  onClick={() => handleOpen('create')}
               >
                  Thêm mới
               </ButtonUI>
            </div>
            <Input
               className='max-w-80'
               placeholder='Tìm kiếm danh mục'
               startContent={<Search size={20} />}
               isClearable
               variant='flat'
            />
         </div>
         <Table
            aria-label='Category table'
            isHeaderSticky
            bottomContent={
               <div className='flex w-full justify-end'>
                  <Pagination
                     showControls
                     page={1}
                     total={2}
                     onChange={(page) => console.log(page)}
                  />
               </div>
            }
            classNames={{
               wrapper: 'rounded-md',
               table: 'min-w-[600px]'
            }}
         >
            <TableHeader>
               <TableColumn>_id</TableColumn>
               <TableColumn>Danh mục</TableColumn>
               <TableColumn>Hình ảnh</TableColumn>
               <TableColumn width={136}>Thao tác</TableColumn>
            </TableHeader>
            <TableBody
               items={data}
               isLoading={isLoading || isRefetching}
               loadingContent={<Spinner label='Loading...' />}
               emptyContent={<EmptyStates />}
            >
               {(item) => (
                  <TableRow key={item?._id}>
                     <TableCell>Tony Reichert</TableCell>
                     <TableCell>CEO</TableCell>
                     <TableCell>Active</TableCell>
                     <TableCell>
                        <div className='flex gap-2'>
                           <ButtonUI
                              tooltip='Xem chi tiết'
                              isIconOnly
                              color='primary'
                              className='bg-yellow-400'
                              size='sm'
                           >
                              <Eye size={18} />
                           </ButtonUI>

                           <ButtonUI
                              isIconOnly
                              tooltip='Sửa'
                              color='primary'
                              className='bg-[--orange-color]'
                              size='sm'
                           >
                              <SquarePen size={18} />
                           </ButtonUI>

                           <ButtonUI
                              isIconOnly
                              tooltip='Xoá'
                              color='primary'
                              className='bg-[--red-color]'
                              size='sm'
                           >
                              <Trash2 size={18} />
                           </ButtonUI>
                        </div>
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>

         <ModalUI
            headerTitle={{
               view: 'Chi tiết danh mục',
               create: 'Tạo danh mục',
               edit: 'Cập nhật danh mục',
               delete: 'Xoá danh mục'
            }}
            modalType={modalType}
            isOpen={isOpen}
            onOpenChange={(isOpen) => {
               onOpenChange();
               isOpen === false && setModalType(undefined);
            }}
            onSave={handleSubmit(onSubmit)}
         >
            {renderModal}
         </ModalUI>
      </>
   );
};

export default CategoryPage;
