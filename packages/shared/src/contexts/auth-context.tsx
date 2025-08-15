import { redirect } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useCookies } from 'react-cookie';

import { environment } from '@shared/environment';
import { dummyTokenPath } from '@shared/lib/dummy-data';
import { User } from '@shared/types/user';

type AuthContextType = {
  user: User;
  signout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

type Props = {
  children: ReactNode;
  user: User;
};

export function AuthProvider({ children, user }: Props) {
  const [_cookies, _setCookie, removeCookie] = useCookies();

  const handleSignout = useCallback(() => {
    removeCookie(dummyTokenPath, { path: '/' });
    redirect(environment.LOGIN_UI_BASE_URL);
  }, [removeCookie]);

  const value = useMemo(
    () => ({
      signout: handleSignout,
      user: user,
    }),
    [user, handleSignout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => useContext(AuthContext);
