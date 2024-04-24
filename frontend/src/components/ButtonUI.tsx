import { Button, ButtonProps } from '@nextui-org/react';
import React from 'react';
import tw from '~/lib/tw';

const ButtonUI: React.FC<ButtonProps> = ({ children, className, color = 'default', ...rest }) => {
   return (
      <Button className={tw('rounded', className)} color={color} {...rest}>
         {children}
      </Button>
   );
};

export default ButtonUI;
