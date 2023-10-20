import Button, { ButtonProps } from '@mui/material/Button';

import React from 'react';

interface GenericButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button type={props?.type ?? 'button'} {...props}>
      {children}
    </Button>
  );
};

export { GenericButton as Button };
