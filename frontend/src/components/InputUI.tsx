import React, { ForwardRefRenderFunction, forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import tw from '~/lib/tw';

interface InputProps {
   label?: string;
   classNames?: {
      wrapper?: string;
      label?: string;
      error?: string;
   };
   className?: string;
   type?: 'text' | 'number';
   error?: string | undefined;
   placeholder?: string;
   disabled?: boolean;
   readOnly?: boolean;
   [index: string]: any;
}

const InputUI: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
   { label, type = 'text', classNames, className, error, placeholder, disabled, readOnly, ...rest },
   ref
) => {
   return (
      <div className={tw('w-full', classNames?.wrapper)}>
         <label className={tw('mb-2 block text-sm font-medium text-gray-900', classNames?.label)}>
            {label}
         </label>
         <input
            ref={ref}
            type='text'
            className={tw(
               'transition-ease block w-full rounded border-[1.5px] p-2.5 text-sm text-gray-900 outline-none focus:border-gray-900',
               className,
               error &&
                  'border-red-500 bg-red-50  text-red-900 placeholder-red-700 focus:border-red-500'
            )}
            placeholder={placeholder || label}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
         />
         {error && (
            <p className={tw('mt-2 text-sm font-medium text-red-600', classNames?.error)}>
               {error}
            </p>
         )}
      </div>
   );
};

const InputPassword: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
   { label, type = 'text', classNames, className, error, placeholder, ...rest },
   ref
) => {
   const [isVisible, setIsVisible] = useState(false);
   const toggleVisibility = () => setIsVisible(!isVisible);

   return (
      <div className={tw('w-full', classNames?.wrapper)}>
         <label className={tw('mb-2 block text-sm font-medium text-gray-900', classNames?.label)}>
            {label}
         </label>
         <div className='relative'>
            <input
               ref={ref}
               type='text'
               className={tw(
                  'transition-ease block w-full rounded border-[1.5px] p-2.5 pr-8 text-sm text-gray-900 outline-none focus:border-gray-900',
                  className,
                  error &&
                     'border-red-500 bg-red-50  text-red-900 placeholder-red-700 focus:border-red-500'
               )}
               placeholder={placeholder || label}
               {...rest}
            />
            <button
               className='absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none'
               type='button'
               onClick={toggleVisibility}
            >
               {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
         </div>
         {error && (
            <p className={tw('mt-2 text-sm font-medium text-red-600', classNames?.error)}>
               {error}
            </p>
         )}
      </div>
   );
};

export const InputPasswordUI = forwardRef(InputPassword);

export default forwardRef(InputUI);
