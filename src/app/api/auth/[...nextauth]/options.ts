import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        senha: {
          type: 'password',
        },
        nome: {
          type: 'text',
        },
      },
      async authorize(credentials) {
        // pegar credenciais do banco de dados
        const user = { id: '1', email: 'me@email', password: 'password' };
        console.log({ credentials });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log({ session, token });
      session.user.userData = 'INFO DO BANCO';
      session.user.name = 'Nome do banco';
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};
