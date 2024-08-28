import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { ForgottenPasswordScreen } from './ForgottenPasswordScreen';
import { ValidationScreen } from './ValidationScreen';
import { PublicScreenNavList } from '../types/navProps';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { StackHeader } from '../components/molecules/StackHeader';

const Stack = createNativeStackNavigator<PublicScreenNavList>();

export function PublicScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade',
        contentStyle: { padding: 16, backgroundColor: 'transparent' },
        headerShadowVisible: false,
        header: props => <StackHeader {...props} />,
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        options={{ title: 'Sign up' }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="ForgottenPassword"
        options={{ title: 'Forgotten password' }}
        component={ForgottenPasswordScreen}
      />
      <Stack.Screen
        name="ResetPassword"
        options={{ title: 'Reset password' }}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name="Validation"
        options={{ title: 'Validate account' }}
        component={ValidationScreen}
      />
    </Stack.Navigator>
  );
}
