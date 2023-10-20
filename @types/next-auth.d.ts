import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      userData?: unknown;
    } & DefaultSession['user'];
  }
}
