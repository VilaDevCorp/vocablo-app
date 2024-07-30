import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PublicScreen} from './src/screens/PublicScreen';
import {Toast} from './src/components/ui/Toast/Toast';
import {useAuth} from './src/hooks/useAuth';
import {PrivateScreen} from './src/screens/PrivateScreen';
import {colors} from './src/styleVars';
import { ConfirmationModal } from './src/components/organisms/ConfirmationModal';

export const Body = () => {
  const {csrf} = useAuth();

  return (
    <SafeAreaView style={style.safeViewLayout}>
      <View style={style.content}>
        <NavigationContainer>
          {csrf ? <PrivateScreen /> : <PublicScreen />}
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
    padding: 16,
  },
});
