import React from 'react';
import styles from './styles.module.scss';
import { TextField } from '@mui/material';
import { Button } from '@/app/components/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ autor: string }>();

  const onSubmit = async (data: { autor: string }) => {
    router.push(`/busca/${data.autor}`);
    reset();
  };

  return (
    <React.Fragment>
      <form
        className={styles.searchContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          placeholder="Pesquise pelo seu autor"
          error={Boolean(errors.autor)}
          className={styles.mainInput}
          {...register('autor', { required: true })}
        />

        <Button
          variant="contained"
          type="submit"
          className={styles.mainButton}
          loading={isSubmitting}
        >
          Buscar
        </Button>
      </form>
    </React.Fragment>
  );
}
