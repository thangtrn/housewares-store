'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputUI, { InputFileUI } from '~/components/InputUI';
import { ModalType } from '~/components/ModalUI';
import { IProduct } from '~/interfaces/schema.interfaces';

import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import { SunEditorOptions } from 'suneditor/src/options';
import { UploadBeforeHandler } from 'suneditor-react/dist/types/upload';

const SunEditor = dynamic(() => import('suneditor-react'), {
   ssr: false
});

interface FormHandlerProps {
   formId: string;
   onSubmit: (data: any) => void;
   payload?: IProduct | undefined;
   type?: ModalType;
}

const editorOption: SunEditorOptions = {
   mode: 'classic',
   katex: 'window.katex',
   videoFileInput: false,
   tabDisable: false,
   buttonList: [
      [
         'undo',
         'redo',
         'font',
         'fontSize',
         'formatBlock',
         'bold',
         'underline',
         'italic',
         'strike',
         'subscript',
         'superscript',
         'fontColor',
         'hiliteColor',
         'textStyle',
         'removeFormat',
         'outdent',
         'indent',
         'align',
         'horizontalRule',
         'list',
         'lineHeight',
         'table',
         'link',
         'image',
         'video',
         'preview'
      ]
   ]
};

const FormHandler: React.FC<FormHandlerProps> = ({ onSubmit, formId, type, payload }) => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();

   const handleChange = (content: any) => {
      console.log(content); //Get Content Inside Editor
   };

   const handleImageUploadBefore = (
      files: File[],
      info: object,
      uploadHandler: UploadBeforeHandler
   ) => {
      // uploadHandler is a function
      console.log(files, info);
   };

   return (
      <form id={formId} className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
         {(type === 'view' || type === 'edit') && (
            <InputUI
               label='Mã sản phẩm'
               disabled
               {...register('_id', {
                  value: payload?._id,
                  required: 'Vui lòng không bỏ trống trường này'
               })}
            />
         )}
         <InputUI
            label='Tên sản phẩm'
            readOnly={type === 'view'}
            {...register('name', {
               value: payload?.name,
               required: 'Vui lòng không bỏ trống trường này'
            })}
            error={errors?.name?.message}
         />
         <div className='flex items-end gap-2'>
            <InputFileUI
               classNames={{
                  wrapper: 'w-fit'
               }}
               label='Hình ảnh'
               disabled={type === 'view'}
               imagePreview={payload?.images?.[0]?.imageUrl}
               {...register('images_1', {
                  required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
               })}
               error={errors?.images?.message}
            />
            <InputFileUI
               classNames={{
                  wrapper: 'w-fit'
               }}
               disabled={type === 'view'}
               imagePreview={payload?.images?.[0]?.imageUrl}
               {...register('images_2', {
                  required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
               })}
               error={errors?.images?.message}
            />
            <InputFileUI
               classNames={{
                  wrapper: 'w-fit'
               }}
               disabled={type === 'view'}
               imagePreview={payload?.images?.[0]?.imageUrl}
               {...register('images_3', {
                  required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
               })}
               error={errors?.images?.message}
            />
            <InputFileUI
               classNames={{
                  wrapper: 'w-fit'
               }}
               disabled={type === 'view'}
               imagePreview={payload?.images?.[0]?.imageUrl}
               {...register('images', {
                  required: type === 'create' ? 'Vui lòng không bỏ trống trường này' : false
               })}
               error={errors?.images?.message}
            />
         </div>
         <InputUI
            type='number'
            label='Số lương sản phẩm'
            readOnly={type === 'view'}
            {...register('quantity', {
               value: payload?.quantity,
               required: 'Vui lòng không bỏ trống trường này',
               min: {
                  value: 0,
                  message: 'Số lượng sản phẩm phải lớn hơn hoặc bằng 0.'
               }
            })}
            error={errors?.quantity?.message}
         />
         <InputUI
            type='number'
            label='Giá bán'
            readOnly={type === 'view'}
            {...register('price', {
               value: payload?.price,
               required: 'Vui lòng không bỏ trống trường này',
               min: {
                  value: 0,
                  message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0.'
               }
            })}
            error={errors?.price?.message}
         />
         <div className='grid grid-cols-4 gap-4'>
            <InputUI
               label='Kích thước'
               readOnly={type === 'view'}
               {...register('size', {
                  value: payload?.detail?.size
               })}
               error={errors?.size?.message}
            />
            <InputUI
               label='Màu sắc'
               readOnly={type === 'view'}
               {...register('color', {
                  value: payload?.detail?.color
               })}
               error={errors?.color?.message}
            />
            <InputUI
               label='Thương hiệu'
               readOnly={type === 'view'}
               {...register('brand', {
                  value: payload?.detail?.brand
               })}
               error={errors?.brand?.message}
            />
            <InputUI
               label='Xuất sứ'
               readOnly={type === 'view'}
               {...register('origin', {
                  value: payload?.detail?.origin
               })}
               error={errors?.origin?.message}
            />
         </div>
         <div>
            <label className='mb-2 block text-sm font-medium text-gray-900'>Mô tả</label>
            <SunEditor
               width='100%'
               height='600px'
               onChange={handleChange}
               onImageUploadBefore={handleImageUploadBefore}
               setOptions={editorOption}
            />
         </div>
      </form>
   );
};

export default FormHandler;
