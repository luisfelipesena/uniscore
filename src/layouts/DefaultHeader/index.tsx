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

export function DefaultHeader() {
  const authFunctions = useAuth();

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
      const response = await axios.post<{ data: User | undefined }>(
        '/api/cadastro',
        {
          email,
          senha,
          nome,
        }
      );

      toast.success(
        `Usuário ${response.data.data?.nome} cadastrado com sucesso`
      );
      cadastroReset();
    } catch (err: any) {
      toast.error(`Erro ao fazer login: ${err?.error}`);
    }
  };

  const onLoginSubmit = async (data: Omit<User, 'id' | 'nome'>) => {
    const { email, senha } = data;
    try {
      const response = await axios.post<LocalStorageUser>('/api/login', {
        email,
        senha,
      });

      if (!response.data) {
        toast.error(`Erro ao fazer login`);
        return;
      }

      authFunctions.login(response.data);
      loginReset();
    } catch (err: any) {
      toast.error(`Erro ao fazer login: ${err?.error}`);
    }
  };

  const [signInCliked, setSignInCliked] = React.useState(false);
  const [signUpCliked, setSignUpCliked] = React.useState(false);

  React.useEffect(() => {
    const userAuthenticated = authFunctions.user?.token;
    if (userAuthenticated) {
      setSignInCliked(false);
      setSignUpCliked(false);
    }
  }, [authFunctions.user]);

  return (
    <React.Fragment>
      <Header className={styles.defaultHeaderContainer}>
        <h1>Uniscore</h1>

        <div className={styles.buttonsDiv}>
          {authFunctions.user?.nome ? (
            <React.Fragment>
              <span>Olá, {authFunctions.user.nome}</span>
              <Button
                onClick={() => {
                  authFunctions.logout();
                }}
              >
                Sair
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button onClick={() => setSignInCliked(true)}>Entrar</Button>

              <Button variant="outlined" onClick={() => setSignUpCliked(true)}>
                Cadastrar
              </Button>
            </React.Fragment>
          )}
        </div>
      </Header>

      <Modal
        title="Login Admin"
        onClose={() => setSignInCliked(false)}
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
        onClose={() => setSignUpCliked(false)}
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
