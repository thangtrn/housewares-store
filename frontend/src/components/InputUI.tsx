import React, { useState } from 'react';
import { Input, InputProps } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';

const InputUI: React.FC<InputProps> = ({ label, classNames, ...rest }) => {
   return (
      <Input
         label={label}
         placeholder={label as string}
         labelPlacement='outside'
         variant='bordered'
         classNames={{
            inputWrapper: 'border-[1.5px] rounded',
            ...classNames
         }}
         {...rest}
      />
   );
};

export const InputPasswordUI: React.FC<InputProps> = ({ label, classNames, ...rest }) => {
   const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => setIsVisible(!isVisible);

   return (
      <Input
         label={label}
         placeholder={label as string}
         labelPlacement='outside'
         variant='bordered'
         classNames={{
            inputWrapper: 'border-[1.5px] rounded',
            ...classNames
         }}
         {...rest}
         endContent={
            <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
               {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
         }
         type={isVisible ? 'text' : 'password'}
      />
   );
};

export default InputUI;
