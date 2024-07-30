import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';

const Tab = createBottomTabNavigator();

export function PrivateScreen() {
  const { user, logout } = useAuth();


  return (
    <>
    <Tab.Navigator sceneContainerStyle={{ padding: 16 }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
    </>
  );
}
