import React, { useEffect } from 'react';
import { Body } from './Body';
import { ReactQueryProvider } from './src/hooks/ReactQueryProvider';
import { ToastProvider } from './src/hooks/ToastProvider';
import { ApiProvider } from './src/hooks/ApiProvider';
import { AuthProvider } from './src/hooks/AuthProvider';
import { ErrorProvider } from './src/hooks/ErrorProvider';
import { ConfirmationProvider } from './src/hooks/ConfirmationProvider';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])


  return (
    <ToastProvider>
      <ConfirmationProvider>
        <AuthProvider>
          <ErrorProvider>
            <ReactQueryProvider>
              <ApiProvider>
                <Body />
              </ApiProvider>
            </ReactQueryProvider>
          </ErrorProvider>
        </AuthProvider>
      </ConfirmationProvider>
    </ToastProvider >
  );
};
export default App;
