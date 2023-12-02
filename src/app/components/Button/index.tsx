import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

import React from 'react';

interface GenericButtonProps extends LoadingButtonProps {
  children: React.ReactNode;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <LoadingButton loading={loading} type={props?.type ?? 'button'} {...props}>
      {children}
    </LoadingButton>
  );
};

export { GenericButton as Button };
