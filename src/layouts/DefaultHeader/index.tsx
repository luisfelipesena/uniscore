import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/app/components/Button';
import { Header } from '../../app/components/Header';
import { Modal } from '@/app/components/Modal';
import React from 'react';
import { TextField } from '@mui/material';
import styles from './styles.module.scss';

export function DefaultHeader() {
  const [signInCliked, setSignInCliked] = React.useState(false);
  const [signUpCliked, setSignUpCliked] = React.useState(false);

  const { data } = useSession();
  const userAuthenticated = data?.user;
  console.log({ userAuthenticated });
  return (
    <React.Fragment>
      <Header className={styles.defaultHeaderContainer}>
        <h1>Uniscore</h1>

        <div className={styles.buttonsDiv}>
          {userAuthenticated ? (
            <React.Fragment>
              <span>Olá, {userAuthenticated.name}</span>
              <Button
                onClick={() => {
                  signOut();
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
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();
            const formValues = new FormData(ev.target as HTMLFormElement);
            const email = formValues.get('email');
            const password = formValues.get('password');

            const response = await signIn('credentials', {
              email,
              password,
            });

            console.log({ response });
          }}
        >
          <TextField placeholder="E-mail" type="email" />
          <TextField placeholder="Senha" type="password" />

          <Button
            className={styles.formButton}
            variant="contained"
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
        {/* USAR REACT FORM */}
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();
            const formValues = new FormData(ev.target as HTMLFormElement);
            const email = formValues.get('email');
            const password = formValues.get('password');

            // cadastrar no banco como admin
            console.log({ email, password });
          }}
        >
          <TextField placeholder="E-mail" type="email" />
          <TextField placeholder="Senha" type="password" />

          <Button
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
