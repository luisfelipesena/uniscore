import { Footer } from '@/app/components/Footer';
import React from 'react';
import styles from './styles.module.scss';

export const DefaultFooter = () => {
  return (
    <Footer>
      <div className={styles.footer}>
        <span>
          Copyright © 2023 <strong>UniScore.com.br</strong>
        </span>
      </div>
    </Footer>
  );
};
