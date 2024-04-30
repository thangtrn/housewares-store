'use client';
import React, { useEffect, useRef, useState } from 'react';
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
   Avatar,
   Button,
   AvatarGroup
} from '@nextui-org/react';
import { CirclePlus, Eye, RotateCcw, Search, SquarePen, Trash2 } from 'lucide-react';
import ButtonUI from '~/components/ButtonUI';
import ModalUI, { ModalType } from '~/components/ModalUI';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from './_fetch';
import EmptyStates from '~/components/EmptyStates';
import FormHandler from './_components/FormHandler';
import { IPagination } from '~/interfaces/pagination.interfaces';
import tw from '~/lib/tw';
import { IProduct } from '~/interfaces/schema.interfaces';

const formId = 'submit-product';

interface ProductQueryData {
   result: IProduct[];
   pagination: IPagination;
}

const ProductPage = () => {
   // -------------- state --------------
   const [payload, setPayload] = useState<IProduct | undefined>();
   const [modalType, setModalType] = useState<ModalType>(null);
   const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

   const [pagination, setPagination] = useState<IPagination>({
      page: 1,
      limit: 4
   });

   const filterRef = useRef<HTMLInputElement>(null);
   const [filter, setFiter] = useState<string>('');

   const { data, isLoading, isRefetching, refetch } = useQuery<ProductQueryData>({
      queryKey: ['/category', pagination, filter],
      queryFn: () => fetchProducts({ page: pagination.page, limit: pagination.limit, filter }),
      placeholderData: keepPreviousData
   });

   useEffect(() => {
      if (data?.pagination) {
         setPagination((prev) => ({ ...prev, ...data?.pagination }));
      }
   }, [data?.pagination]);

   const createMutation = useMutation({
      mutationFn: (data) => {
         return createProduct(data);
      }
   });

   const updateMutation = useMutation({
      mutationFn: (data) => {
         return updateProduct(data);
      }
   });

   const deleteMutation = useMutation({
      mutationFn: (data) => {
         return deleteProduct(data);
      }
   });

   // -------------- handler --------------

   const onMutationSuccess = () => {
      refetch();
      onClose();
   };

   const handleOpen = (modalType?: ModalType, payload?: IProduct) => {
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
                  onClick={() => refetch()}
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
            <div className='flex gap-2'>
               <Input
                  ref={filterRef}
                  className='max-w-80'
                  placeholder='Tìm kiếm danh mục'
                  startContent={<Search size={20} />}
               />
               <Button
                  isIconOnly
                  type='submit'
                  color='primary'
                  onClick={() => setFiter(filterRef.current?.value as string)}
               >
                  <Search size={16} />
               </Button>
            </div>
         </div>
         <Table
            aria-label='Category table'
            isHeaderSticky
            bottomContent={
               <div className='flex w-full justify-end'>
                  <Pagination
                     showControls
                     className={tw(!data && 'invisible')}
                     page={Number(data?.pagination?.page) || 1}
                     total={Number(data?.pagination?.totalPage) || 1}
                     onChange={(page) => setPagination((prev) => ({ ...prev, page: page }))}
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
               items={data?.result || []}
               isLoading={isLoading || isRefetching}
               loadingContent={<Spinner label='Loading...' />}
               emptyContent={<EmptyStates />}
            >
               {(item) => (
                  <TableRow key={item?._id}>
                     <TableCell>{item?._id}</TableCell>
                     <TableCell>{item?.name}</TableCell>
                     <TableCell>
                        <AvatarGroup isBordered>
                           {
                              !!item.images?.map((image) => (
                                 <Avatar
                                    key={image._id}
                                    src={image?.imageUrl}
                                    isBordered
                                    radius='sm'
                                    className='text-large h-16 w-16'
                                 />
                              ))
                           }
                        </AvatarGroup>
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
               view: 'Chi tiết sản phẩm',
               create: 'Tạo sản phẩm',
               edit: 'Cập nhật sản phẩm',
               delete: 'Xoá sản phẩm'
            }}
            size='5xl'
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

export default ProductPage;
