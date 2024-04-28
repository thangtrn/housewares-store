import React from 'react';
import {
   ModalProps,
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter
} from '@nextui-org/react';
import ButtonUI from './ButtonUI';

export type ModalType = 'view' | 'create' | 'edit' | 'delete' | undefined | null;

interface ModalUIProps {
   headerTitle?: {
      view?: string;
      edit?: String;
      create?: String;
      delete?: String;
   };
   modalType: ModalType;
   isOpen: boolean;
   onOpenChange: (isOpen: boolean) => void;
   onSave?: () => void;
   children: React.ReactNode | ((modalType: ModalType) => React.ReactNode);
}

const header = { view: 'Xem chi tiết', create: 'Tạo mới', edit: 'Chỉnh sửa', delete: 'Xoá' };

const ModalUI: React.FC<Omit<ModalProps, 'children'> & ModalUIProps> = ({
   headerTitle = header,
   children,
   modalType,
   isOpen,
   onOpenChange,
   onSave
}) => {
   console.log();
   return (
      <Modal
         placement='center'
         isOpen={isOpen}
         onOpenChange={(isOpen) => {
            onOpenChange?.(isOpen);
         }}
      >
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className='flex flex-col gap-1'>
                     {headerTitle?.[modalType!]}
                  </ModalHeader>
                  <ModalBody>
                     {typeof children === 'function' ? children?.(modalType) : children}
                  </ModalBody>
                  <ModalFooter>
                     <ButtonUI color='danger' variant='light' onPress={onClose}>
                        Đóng
                     </ButtonUI>
                     {modalType !== 'view' && (
                        <ButtonUI color='primary' onPress={onSave}>
                           {modalType === 'delete' ? 'Xoá' : 'Lưu'}
                        </ButtonUI>
                     )}
                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   );
};

export default ModalUI;
