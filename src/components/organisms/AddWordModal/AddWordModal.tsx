import React, { useState } from 'react';
import { Modal } from '../../ui/Modal/Modal';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddWordModalNavList } from '../../../types/navProps';
import { AddWordModalSection1 } from './AddWordModalSection1';
import { AddWordModalSection2 } from './AddWordModalSection2';
import { colors } from '../../../styleVars';
import { ModalHeader } from './ModalHeader';
import { CreateUserWordForm } from '../../../types/entities';
import { useConfirm } from '../../../hooks/useConfirm';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Icon } from '../../ui/Icon/Icon';

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
                header: (props) => <ModalHeader {...props} customGoBack={secureGoBack} />,
                contentStyle: { padding: 16, backgroundColor: colors.neutral[200] }
            }}>
                <Stack.Screen name='SearchWord' component={AddWordModalSection1} />
                <Stack.Screen name='SaveWord' component={AddWordModalSection2} />
            </Stack.Navigator>
        </AddWordContext.Provider>

    )
}

const style = StyleSheet.create({

})