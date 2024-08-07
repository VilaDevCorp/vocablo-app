import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddWordModalNavList } from '../../../types/navProps';
import { AddWordModalSection1 } from './AddWordModalSection1';
import { AddWordModalSection2 } from './AddWordModalSection2';
import { colors } from '../../../styleVars';
import { CreateUserWordForm } from '../../../types/entities';
import { useConfirm } from '../../../hooks/useConfirm';
import { ParamListBase } from '@react-navigation/native';
import { Icon } from '../../ui/Icon/Icon';
import { StackHeader } from '../../molecules/StackHeader';

const Stack = createNativeStackNavigator<AddWordModalNavList>();

interface AddWordContext {
    form: CreateUserWordForm
    setForm: React.Dispatch<React.SetStateAction<CreateUserWordForm>>
}

export const AddWordContext = React.createContext<AddWordContext>({
    form: { lang: 'en', term: '', definitions: [] }, setForm: () => { }
})


export function AddWordModal() {

    const [addWordForm, setAddWordForm] = useState<CreateUserWordForm>({ term: '', lang: 'en', definitions: [] })

    const { showConfirmationModal } = useConfirm()

    const secureGoBack = (navigation: NativeStackNavigationProp<ParamListBase>) => {
        showConfirmationModal('If you go back, you will lose your changes. Are you sure?',
            () => navigation.goBack(), <Icon type='alert' color={colors.error[500]} size={64} />)
    }

    return (
        <AddWordContext.Provider value={{ form: addWordForm, setForm: setAddWordForm }}>
            <Stack.Navigator screenOptions={{
                animation: 'ios',
                header: (props) => <StackHeader containerStyle={{ margin:16, marginBottom:0}}
                    {...props} isModal customGoBack={secureGoBack} />,
                contentStyle: { padding: 16 }
            }}>
                <Stack.Screen name='SearchWord' options={{ title: 'Add word' }} component={AddWordModalSection1} />
                <Stack.Screen name='SaveWord' options={{ title: 'Add word' }} component={AddWordModalSection2} />
            </Stack.Navigator>
        </AddWordContext.Provider>

    )
}

const style = StyleSheet.create({

})