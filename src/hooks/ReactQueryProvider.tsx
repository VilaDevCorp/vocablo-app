import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { ReactNode, createContext } from 'react';
import { useToast } from './useToast';
import { useError } from './useError';

interface ReactQueryContext {
  queryClient: QueryClient;
}

export const ReactQueryContext = createContext<ReactQueryContext>(
  {} as ReactQueryContext,
);

//This provider is used to get the queryClient instance from the context and to have the QueryClientProvider
//declaration encapsulated
//We can use the toast too, because from the App.tsx we are not able to use it as its not a child of the ToastProvider
export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const { setError } = useError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (e, query) => {
        const errorMsg = query?.meta?.errorInfo ? query.meta.errorInfo as string : 'An error occurred';
        if (query.meta?.errorInfo) {
          showToast(errorMsg, 'alert', 'error');
        } else {
          setError(e)
        }
      },
    }),
  });

  const value: ReactQueryContext = {
    queryClient: queryClient,
  };

  return (
    <ReactQueryContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReactQueryContext.Provider>
  );
};
