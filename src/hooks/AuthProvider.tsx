import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { User } from '../types/entities';
import { ApiError, ApiResponse, ErrorCode } from '../types/types';
import EncryptedStorage from 'react-native-encrypted-storage';
import { conf } from '../conf';
import { checkResponseException } from '../utils/utilFunctions';
import StatusCode from 'status-code-enum';
import { useToast } from './useToast';

export interface AuthContext {
  user?: User;
  csrf?: string;
  authenticate: (email: string, password: string) => void;
  logout: () => void;
  isInit: boolean;
  deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInit, setIsInit] = useState(false);
  const [csrf, setCsrf] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  const firstRender = useRef(true)
  const apiUrl = conf.apiUrl;
  const { showToast } = useToast();

  const storeSession = async (csrf: string) => {
    try {
      await EncryptedStorage.setItem(
        'csrf',
        JSON.stringify({
          csrf,
        }),
      );
    } catch (error) { }
  };
  const retrieveSession = async () => {
    try {
      const session = await EncryptedStorage.getItem('csrf');
      const parsedSession = session ? JSON.parse(session) : undefined;

      if (parsedSession !== undefined && parsedSession.csrf !== undefined) {
        setCsrf(parsedSession.csrf);
      } else {
        setIsInit(true);
      }
    } catch { } finally {
    }
  };

  const removeSession = async () => {
    const session = await EncryptedStorage.removeItem('csrf');
  };

  useEffect(() => {
    //We avoid executing reloadUserInfo on the first render because its going to make the init screen to flicker
    //(Csrf stored in session -> this effect runs -> reloadUserInfo -> isInit = true)
    //(Csrf not stored in session -> this effect doesnt run but retrieveSession sets isInit = true with the else block)
    if (firstRender.current) return
    setIsInit(false);
    reloadUserInfo();
  }, [csrf]);

  useEffect(() => {
    firstRender.current = false
    if (csrf === undefined) {
      retrieveSession();
    }
  }, []);

  const reloadUserInfo = async () => {
    if (csrf) {
      const user = await self();
      setUser(user);
    }
    setIsInit(true);
  }

  const self = async (): Promise<User | undefined> => {
    if (csrf) {
      try {
        const url = `${apiUrl}self`;
        const options: RequestInit = {
          method: 'GET',
          headers: new Headers({
            'X-API-CSRF': csrf ? csrf : '',
          }),
          credentials: 'include',
        };
        const res = await fetch(url, options);
        const result: ApiResponse<User> = await res.json();
        checkResponseException(res, result);
        return result.data;
      } catch (error) {
        if (error instanceof ApiError) {
          switch (error.statusCode) {
            case StatusCode.ClientErrorUnauthorized:
              if (
                error.code === ErrorCode.NOT_JWT_TOKEN ||
                error.code === ErrorCode.NOT_CSR_TOKEN ||
                error.code === ErrorCode.INVALID_TOKEN
              ) {
                logout();
                showToast('Your session has expired', 'alert', 'error');
                break;
              }
          }
        } else {
          showToast('There was an error obtaining your user data. Sign in again.', 'alert', 'error');
          logout();
        }
      } finally {
      }
    } else {
      throw new Error('No csrf token');
    }
  };

  const login = async (username: string, password: string): Promise<string> => {
    const url = `${apiUrl}public/login`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
    const res = await fetch(url, options);
    const result: ApiResponse<string> = await res.json();
    if (!res.ok) {
      throw new ApiError({
        statusCode: res.status,
        message: result.errorMessage,
        code: result.errorCode,
      });
    }
    return result.data;
  };

  const authenticate = async (
    email: string,
    password: string,
    // rememberMe: boolean,
  ) => {
    const csrf = await login(email.toLowerCase().trim(), password);
    setCsrf(csrf);
    // if (rememberMe) {
    storeSession(csrf);
    // }
  };


  const deleteAccount = async (): Promise<void> => {
    if (csrf) {
      try {
        const url = `${apiUrl}account`;
        const options: RequestInit = {
          method: 'DELETE',
          headers: new Headers({
            'X-API-CSRF': csrf ? csrf : '',
          }),
          credentials: 'include',
        };
        const res = await fetch(url, options);
        const result: ApiResponse<void> = await res.json();
        checkResponseException(res, result);
        logout();
      } catch (error) {
        throw new Error('There was an error deleting account');
      }
    } else {
      throw new Error('No csrf token');
    }
  };


  const logout = () => {
    cleanUserParams();
  };

  const cleanUserParams = () => {
    removeSession();
    setCsrf('');
  };

  const value: AuthContext = {
    user,
    csrf,
    authenticate,
    logout,
    isInit,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
