import { User } from '@/app/api/controllers/database/factory';

export const USER_LOCAL_STORAGE_KEY = '__auth_user__';

export type LocalStorageUser = Omit<User, 'senha' | 'active'> & {
  token: string;
};

export function saveUserStorage(user: LocalStorageUser): void {
  window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUserStorage(): LocalStorageUser | undefined {
  const user = window.localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUserStorage(): void {
  window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
