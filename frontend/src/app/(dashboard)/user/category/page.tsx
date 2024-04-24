'use client';
import React from 'react';
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Pagination
} from '@nextui-org/react';
import { CirclePlus, Eye, RotateCcw, Search, SquarePen, Trash2 } from 'lucide-react';
import InputUI from '~/components/InputUI';
import ButtonUI from '~/components/ButtonUI';
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Button,
   useDisclosure
} from '@nextui-org/react';

const CategoryPage = () => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   return (
      <>
         <div className='section-card mb-4 flex justify-between'>
            <div className='flex gap-3'>
               <ButtonUI
                  startContent={<RotateCcw size={16} />}
                  color='primary'
                  className='bg-[--green-color]'
                  onClick={onOpen}
               >
                  Làm mới
               </ButtonUI>

               <ButtonUI startContent={<CirclePlus size={16} />} color='primary'>
                  Làm mới
               </ButtonUI>
            </div>
            <InputUI
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
            <TableBody>
               <TableRow key='1'>
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
            </TableBody>
         </Table>

         <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
                     <ModalBody>
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                           risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                           risus, sed porttitor quam.
                        </p>
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                           risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                           risus, sed porttitor quam.
                        </p>
                        <p>
                           Magna exercitation reprehenderit magna aute tempor cupidatat consequat
                           elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
                           quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                           eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
                           pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
                     </ModalBody>
                     <ModalFooter>
                        <Button color='danger' variant='light' onPress={onClose}>
                           Close
                        </Button>
                        <Button color='primary' onPress={onClose}>
                           Action
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
};

export default CategoryPage;
