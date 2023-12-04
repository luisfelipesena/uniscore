import { Button } from '@/app/components/Button';
import { Header } from '../../app/components/Header';
import { Modal } from '@/app/components/Modal';
import React from 'react';
import { TextField } from '@mui/material';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { User } from '@/app/api/controllers/database/factory';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@/contexts/auth';
import { LocalStorageUser } from '@/services/user-storage';
import Image from 'next/image';
import Link from 'next/link';

export function DefaultHeader() {
  const { login, logout, user } = useAuth();

  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    reset: loginReset,
    formState: { errors: loginErrors, isSubmitting: loginIsSubmitting },
  } = useForm<Omit<User, 'id' | 'nome'>>();

  const {
    register: cadastroRegister,
    handleSubmit: cadastroHandleSubmit,
    reset: cadastroReset,
    formState: { errors: cadastroErrors, isSubmitting: cadastroIsSubmitting },
  } = useForm<Omit<User, 'id'>>();

  const onSignInSubmit = async (data: Omit<User, 'id'>) => {
    const { nome, email, senha } = data;
    try {
      const { data: response } = await axios.post<{ data?: User }>(
        '/api/cadastro',
        {
          email,
          senha,
          nome,
        }
      );

      toast.success(`Usuário ${response?.data?.nome} cadastrado com sucesso`);
      cadastroReset();
    } catch (err: any) {
      const errorMessage = err?.response?.statusText ?? err?.message;
      toast.error(`Erro ao fazer cadastro: ${errorMessage}`);
    }
  };

  const onLoginSubmit = async (data: Omit<User, 'id' | 'nome'>) => {
    const { email, senha } = data;
    try {
      const { data: response } = await axios.post<{ data?: LocalStorageUser }>(
        '/api/login',
        {
          email,
          senha,
        }
      );

      if (!response?.data) {
        toast.error(`Erro ao fazer login`);
        return;
      }

      login(response.data);
      loginReset();
    } catch (err: any) {
      const errorMessage = err?.response?.statusText ?? err?.message;
      toast.error(`Erro ao fazer login: ${errorMessage}`);
    }
  };

  const [signInCliked, setSignInCliked] = React.useState(false);
  const [signUpCliked, setSignUpCliked] = React.useState(false);

  React.useEffect(() => {
    const userAuthenticated = user?.token;
    if (userAuthenticated) {
      setSignInCliked(false);
      setSignUpCliked(false);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Header className={styles.defaultHeaderContainer}>
        <Link href="/">
          <Image priority src="/logo.svg" alt="Logo" width={180} height={30} />
        </Link>

        <div className={styles.buttonsDiv}>
          {user?.nome ? (
            <React.Fragment>
              <span>Olá, {user.nome}</span>
              <Button
                variant="contained"
                onClick={() => {
                  logout();
                }}
              >
                Sair
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button variant="outlined" onClick={() => setSignInCliked(true)}>
                Entrar
              </Button>

              <Button variant="contained" onClick={() => setSignUpCliked(true)}>
                Cadastrar
              </Button>
            </React.Fragment>
          )}
        </div>
      </Header>

      <Modal
        title="Login Admin"
        onClose={() => {
          loginReset();
          setSignInCliked(false);
        }}
        open={signInCliked}
        className={styles.modal}
      >
        <form onSubmit={loginHandleSubmit(onLoginSubmit)}>
          <TextField
            placeholder="E-mail"
            type="email"
            error={Boolean(loginErrors.email)}
            {...loginRegister('email', { required: true })}
          />

          <TextField
            placeholder="Senha"
            error={Boolean(loginErrors.email)}
            {...loginRegister('senha', { required: true })}
          />

          <Button
            loading={loginIsSubmitting}
            variant="contained"
            className={styles.formButton}
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </Modal>

      <Modal
        title="Cadastrar administrador"
        onClose={() => {
          cadastroReset();
          setSignUpCliked(false);
        }}
        open={signUpCliked}
        className={styles.modal}
      >
        <form onSubmit={cadastroHandleSubmit(onSignInSubmit)}>
          <TextField
            placeholder="Nome"
            error={Boolean(cadastroErrors.nome)}
            {...cadastroRegister('nome', { required: true })}
          />
          <TextField
            placeholder="E-mail"
            type="email"
            error={Boolean(cadastroErrors.email)}
            {...cadastroRegister('email', { required: true })}
          />
          <TextField
            placeholder="Senha"
            type="password"
            error={Boolean(cadastroErrors.senha)}
            {...cadastroRegister('senha', { required: true })}
          />

          <Button
            loading={cadastroIsSubmitting}
            variant="contained"
            className={styles.formButton}
            type="submit"
          >
            Cadastrar
          </Button>
        </form>
      </Modal>
    </React.Fragment>
  );
}
