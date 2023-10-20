import { Button, Dialog } from '@mui/material';
import React, { ReactNode } from 'react';

import { CloseOutlined } from '@mui/icons-material';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  children,
  actions,
  className,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className={classNames(styles.dialog, className)}
    >
      <section className={styles.container}>
        <div className={styles.actionsContainer}>
          <h2 className={styles.title}>{title}</h2>

          {actions || (
            <Button variant="outlined" onClick={onClose} color="secondary">
              <CloseOutlined />
            </Button>
          )}
        </div>

        <div className={styles.childrenContainer}>{children}</div>
      </section>
    </Dialog>
  );
};
