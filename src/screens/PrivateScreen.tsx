import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { BlankScreen } from './BlankScreen';
import { PrivateScreenNavList } from '../types/navProps';
import { Icon } from '../components/ui/Icon/Icon';
import { colors } from '../styleVars';
import { MyWordsScreen } from './MyWordsScreen';
import { BottomTabsHeader } from '../components/molecules/BottomTabsHeader';

const Tab = createBottomTabNavigator<PrivateScreenNavList>();

export function PrivateScreen() {
  const { user, logout } = useAuth();


  return (
    <>
      <Tab.Navigator screenOptions={(props) => ({
        tabBarHideOnKeyboard: true,
        header: (props) => <BottomTabsHeader {...props} />,
        tabBarLabel: () => null,
        tabBarIconStyle: { color: 'red' },
        tabBarIcon: ({ focused, color, size }) => {
          const iconColor = focused ? colors.accent[600] : colors.primary[500];
          switch (props.route.name) {
            case "Home":
              return <Icon type="home" size={size} color={iconColor} />;
            case "AddWord":
              return <Icon type="add" size={size} color={iconColor} />;
            case "MyWords":
              return <Icon type="word" size={size} color={iconColor} />;
          }
        }
      })} sceneContainerStyle={{ padding: 16, paddingBottom: 0, marginBottom: 12 }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="AddWord" component={BlankScreen} options={{ headerShown: false }}
          listeners={({ navigation }) =>
          navigation.navigate("AddWordModal")} />
        <Tab.Screen name="MyWords" component={MyWordsScreen} />
      </Tab.Navigator>
    </>
  );
}
