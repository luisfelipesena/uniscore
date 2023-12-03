import { EnhancedTable } from '@/app/components/Table-Exemple/Table';
import React from 'react';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <React.Fragment>
      <main className={styles.main}>
        <EnhancedTable />
      </main>
    </React.Fragment>
  );
}
