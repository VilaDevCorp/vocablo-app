import React from 'react';
import { MyWordsStackNavList } from '../types/navProps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WordDetailsScreen } from './WordDetailsScreen';
import { MyWordsListScreen } from './MyWordsListScreen';
import { Header } from '../components/molecules/Header';


const MyWordStack = createNativeStackNavigator<MyWordsStackNavList>();
export function MyWordsScreen() {
    return (
        <MyWordStack.Navigator screenOptions={{ animation: 'slide_from_right', header: (props) => <Header {...props} /> }} >
            <MyWordStack.Screen options={{ headerShown: false }} name="MyWordsList" component={MyWordsListScreen} />
            <MyWordStack.Screen options={{title:'asldjlfj'}} name="WordDetails" component={WordDetailsScreen} />
        </MyWordStack.Navigator>
    );
}