import React from 'react';
import styles from './styles.module.scss';
import { TextField } from '@mui/material';
import { Button } from '@/app/components/Button';

export default function Home() {
  // pesquisar dblp e jogar para página de tabela
  return (
    <React.Fragment>
      <main className={styles.main}>
        <form className={styles.searchContainer}>
          <TextField
            variant="outlined"
            placeholder="Pesquise pelo seu autor"
            className={styles.mainInput}
          />
          <Button variant="contained" className={styles.mainButton}>
            Buscar
          </Button>
        </form>
      </main>
    </React.Fragment>
  );
}
