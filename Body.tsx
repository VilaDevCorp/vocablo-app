import React, { useEffect } from 'react';
import { AppState, AppStateStatus, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PublicScreen } from './src/screens/PublicScreen';
import { Toast } from './src/components/ui/Toast/Toast';
import { useAuth } from './src/hooks/useAuth';
import { PrivateScreen } from './src/screens/PrivateScreen';
import { colors } from './src/styleVars';
import { RootStackParamList } from './src/types/navProps';
import { AddWordModal } from './src/components/organisms/AddWordModal/AddWordModal';
import { ConfirmationModal } from './src/components/organisms/ConfirmationModal';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { focusManager } from '@tanstack/react-query';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Body = () => {
  const { csrf } = useAuth();


  //This is to refetch the queries when the app is focused again
  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active')
  }
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView style={style.safeViewLayout}>
      <View style={style.content}>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {csrf ?
              <>
                <RootStack.Screen name="PrivateScreen" component={PrivateScreen} />
                <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                  <RootStack.Screen name="AddWordModal" component={AddWordModal} />
                </RootStack.Group>
              </>
              : <RootStack.Screen name="PublicScreen" component={PublicScreen} />
            }
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
      <Toast />
      <ConfirmationModal />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewLayout: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
