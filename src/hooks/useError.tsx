import {useContext, useEffect} from 'react';
import {ApiError} from '../types/types';
import StatusCode from 'status-code-enum';
import {useAuth} from './useAuth';
import {ErrorContext} from './ErrorProvider';
import {useToast} from './useToast';

export const useError = (navigate?: (route: string) => void) => {
  const ctx = useContext(ErrorContext);
  const {error, setError} = ctx;
  const {logout} = useAuth();

  const {showToast} = useToast();

  useEffect(() => {
    if (error) {
      if (error instanceof ApiError) {
        switch (error.statusCode) {
          case StatusCode.ClientErrorForbidden:
            logout();
            if (navigate) {
              navigate('Login');
            }
            showToast('Your session has expired', 'alert', 'error');
            break;
          default:
            showToast('An internal error has occurred', 'alert', 'error');
        }
      } else {
        showToast('An internal error has occurred', 'alert', 'error');
      }
      setError(undefined);
    }
  }, [error]);

  if (ctx === null) {
    throw new Error(
      'ErrorCode() can only be used on the descendants of ErrorProvider',
    );
  } else {
    return ctx;
  }
};
