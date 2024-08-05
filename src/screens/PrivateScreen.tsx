import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { BlankScreen } from './BlankScreen';
import { PrivateScreenNavList } from '../types/navProps';
import { Icon } from '../components/ui/Icon/Icon';
import { colors } from '../styleVars';
import { MyWordsScreen } from './MyWordsScreen';

const Tab = createBottomTabNavigator<PrivateScreenNavList>();

export function PrivateScreen() {
  const { user, logout } = useAuth();


  return (
    <>
      <Tab.Navigator screenOptions={(route) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => null,
        tabBarIconStyle: { color: 'red' },
        tabBarIcon: ({ focused, color, size }) => {
          const iconColor = focused ? colors.accent[600] : colors.primary[500];
          switch (route.route.name) {
            case "Home":
              return <Icon type="home" size={size} color={iconColor} />;
            case "AddWord":
              return <Icon type="add" size={size} color={iconColor} />;
            case "MyWords":
              return <Icon type="word" size={size} color={iconColor} />;
          }
        }
      })} sceneContainerStyle={{ padding: 16, paddingBottom:0 }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AddWord" component={BlankScreen} listeners={({ navigation }) =>
          navigation.navigate("AddWordModal")} />
        <Tab.Screen name="MyWords" component={MyWordsScreen} />
      </Tab.Navigator>
    </>
  );
}
