import { createContext, ReactNode } from 'react';
import { Quiz, RegisterUserForm, User } from '../types/entities';
import { ApiResponse } from '../types/types';
import { conf } from '../conf';
import { checkResponseException } from '../utils/utilFunctions';
import { useAuth } from './useAuth';

interface ApiContext {
  register: (user: RegisterUserForm) => void;
  sendValidationCode: (username: string) => Promise<void>;
  validateAccount: (username: string, code: string) => Promise<void>;
  forgottenPassword: (username: string) => Promise<void>;
  resetPassword: (
    username: string,
    code: string,
    password: string,
  ) => Promise<void>;
  sendQuiz: (quiz: Quiz) => Promise<number>;
}

export const ApiContext = createContext<ApiContext>({} as ApiContext);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = conf.apiUrl;

  const { csrf } = useAuth();

  const register = async (form: RegisterUserForm) => {
    const url = `${apiUrl}public/register`;
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<User> = await res.json();
    checkResponseException(res, resObject);
  };

  const sendValidationCode = async (username: string): Promise<void> => {
    const url = `${apiUrl}public/validate/${username}/resend`;
    const options: RequestInit = {
      method: 'POST',
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<void> = await res.json();
    checkResponseException(res, resObject);
  };

  const validateAccount = async (
    username: string,
    code: string,
  ): Promise<void> => {
    const url = `${apiUrl}public/validate/${username}/${code}`;
    const options: RequestInit = {
      method: 'POST',
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const forgottenPassword = async (username: string): Promise<void> => {
    const url = `${apiUrl}public/forgotten-password/${username}`;
    const options: RequestInit = {
      method: 'POST',
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const resetPassword = async (
    username: string,
    code: string,
    password: string,
  ): Promise<void> => {
    const url = `${apiUrl}public/reset-password/${username}/${code}`;
    const options: RequestInit = {
      method: 'POST',
      body: password,
      headers: new Headers({
        'content-type': 'text/plain',
      }),
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const sendQuiz = async (quiz: Quiz): Promise<number> => {
    const url = `${apiUrl}quiz/answer`;
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(quiz),
      credentials: 'include',
      headers: new Headers({
        'X-API-CSRF': csrf ? csrf : '',
        'content-type': 'application/json'
      })
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<number> = await res.json();
    checkResponseException(res, resObject);
    return resObject.data;
  }

  const value: ApiContext = {
    register,
    sendValidationCode,
    validateAccount,
    forgottenPassword,
    resetPassword,
    sendQuiz
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
