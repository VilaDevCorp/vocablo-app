import React from 'react';
import { Body } from './Body';
import { ReactQueryProvider } from './src/hooks/ReactQueryProvider';
import { ToastProvider } from './src/hooks/ToastProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApiProvider } from './src/hooks/ApiProvider';
import { AuthProvider } from './src/hooks/AuthProvider';
import { ErrorProvider } from './src/hooks/ErrorProvider';
import { ConfirmationProvider } from './src/hooks/ConfirmationProvider';

const App = () => {
  return (
    <ToastProvider>
      <ErrorProvider>
        <ConfirmationProvider>
          <ReactQueryProvider>
            <AuthProvider>
              <ApiProvider>
                <Body />
              </ApiProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </ConfirmationProvider>
      </ErrorProvider>
    </ToastProvider>
  );
};
export default App;
