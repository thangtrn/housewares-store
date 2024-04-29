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
   Input,
   Avatar
} from '@nextui-org/react';
import { CirclePlus, Eye, RotateCcw, Search, SquarePen, Trash2 } from 'lucide-react';
import ButtonUI from '~/components/ButtonUI';
import ModalUI, { ModalType } from '~/components/ModalUI';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategory, deleteCategory, fetchCategory, updateCategory } from './_fetch';
import { ICategory } from '~/interfaces/schema.interfaces';
import EmptyStates from '~/components/EmptyStates';
import FormHandler from './_components/FormHandler';

const formId = 'submit-category';

const CategoryPage = () => {
   // -------------- state --------------
   const [payload, setPayload] = useState<ICategory | undefined>();
   const [modalType, setModalType] = useState<ModalType>(null);
   const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

   const {
      data = [],
      isLoading,
      isRefetching,
      refetch
   } = useQuery<ICategory[]>({
      queryKey: ['/category'],
      queryFn: fetchCategory
   });

   const createMutation = useMutation({
      mutationFn: (data) => {
         return createCategory(data);
      }
   });

   const updateMutation = useMutation({
      mutationFn: (data) => {
         return updateCategory(data);
      }
   });

   const deleteMutation = useMutation({
      mutationFn: (data) => {
         return deleteCategory(data);
      }
   });

   // -------------- handler --------------

   const onMutationSuccess = () => {
      refetch();
      onClose();
   };

   const handleOpen = (modalType?: ModalType, payload?: ICategory) => {
      setModalType(modalType);
      if (payload) {
         setPayload(payload);
      }
      onOpen();
   };

   const handleCreate = (data: any) => {
      createMutation.mutate(data, {
         onSuccess: onMutationSuccess
      });
   };

   const handleUpdate = (data: any) => {
      updateMutation.mutate(data, {
         onSuccess: onMutationSuccess
      });
   };

   const handleDelete = (e: React.FormEvent) => {
      e.preventDefault();
      deleteMutation.mutate(payload?._id as any, {
         onSuccess: onMutationSuccess
      });
   };

   const renderModal = (modalType: ModalType) => {
      if (modalType === 'delete') {
         return (
            <form id={formId} onSubmit={handleDelete}>
               Bạn có chặc muốn xoá danh mục <span className='font-bold'>{payload?.name}</span> này?
            </form>
         );
      } else {
         const handleSubmit = (data: any) => {
            if (modalType === 'create') {
               handleCreate(data);
            } else if (modalType === 'edit') {
               handleUpdate(data);
            }
         };
         return (
            <FormHandler
               formId={formId}
               onSubmit={handleSubmit}
               type={modalType}
               payload={payload}
            />
         );
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
               <TableColumn width='10%'>_id</TableColumn>
               <TableColumn width='30%'>Danh mục</TableColumn>
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
                     <TableCell>{item?._id}</TableCell>
                     <TableCell>{item.name}</TableCell>
                     <TableCell>
                        {!!item.image?.imageUrl && (
                           <Avatar
                              src={item.image?.imageUrl}
                              isBordered
                              radius='sm'
                              className='text-large h-16 w-16'
                           />
                        )}
                     </TableCell>
                     <TableCell>
                        <div className='flex gap-2'>
                           <ButtonUI
                              tooltip='Xem chi tiết'
                              isIconOnly
                              color='primary'
                              className='bg-yellow-400'
                              size='sm'
                              onClick={() => handleOpen('view', item)}
                           >
                              <Eye size={18} />
                           </ButtonUI>

                           <ButtonUI
                              isIconOnly
                              tooltip='Sửa'
                              color='primary'
                              className='bg-[--orange-color]'
                              size='sm'
                              onClick={() => handleOpen('edit', item)}
                           >
                              <SquarePen size={18} />
                           </ButtonUI>

                           <ButtonUI
                              isIconOnly
                              tooltip='Xoá'
                              color='primary'
                              className='bg-[--red-color]'
                              size='sm'
                              onClick={() => handleOpen('delete', item)}
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
               if (isOpen === false) {
                  setModalType(undefined);
                  setPayload(undefined);
               }
            }}
            isLoading={
               createMutation.isPending || deleteMutation.isPending || updateMutation.isPending
            }
            formId={formId}
         >
            {renderModal}
         </ModalUI>
      </>
   );
};

export default CategoryPage;
