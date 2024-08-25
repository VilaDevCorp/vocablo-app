import React, { useContext, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import { AddWordContext } from './AddWordModal';
import { DefinitionForm } from '../../molecules/DefinitionForm';
import { Definition, UserWord } from '../../../types/entities';
import { useMutation } from '@tanstack/react-query';
import { useCrud } from '../../../hooks/useCrud';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../../hooks/useToast';
import { ScreenLayout } from '../ScreenLayout';

export function AddWordModalSection2({ }: {}) {

    const { form, setForm } = useContext(AddWordContext)
    const scrollViewRef = useRef<ScrollView>(null)

    const navigation = useNavigation()


    const setTerm = (term: string) => {
        setForm({ ...form, term })
    }

    const { showToast } = useToast()

    const addDefinition = () => {
        setForm({ ...form, definitions: [...form.definitions, { definition: '', example: '' }] })
        scrollViewRef.current?.scrollToEnd()
    }

    const disabledButton = form.term === '' || form.definitions.length < 1 || form.definitions.some(def => def.definition === '')

    const { create: createUserWord } = useCrud<UserWord>('userword')

    const { mutate: onCreateUserWord, isPending: isCreatingUserWord } = useMutation({
        mutationFn: () => {
            if (form.term !== '' && form.definitions.length > 0
                && form.definitions.some(def => def.definition !== '') && form.lang !== '') {
                return createUserWord(form)
            }
            return Promise.reject()
        },
        onSuccess: () => { showToast('Word created!', 'check', 'success'); onClose() },
        onError: () => { showToast('There was an error creating the word', 'alert', 'error') }
    })

    const onClose = () => {
        navigation.getParent()?.navigate('MyWords')
    }

    const setDefinition = (definition: Definition, definitionIndex: number) => {
        setForm({
            ...form, definitions: form.definitions.map((def, i) => {
                if (i === definitionIndex) {
                    return definition
                }
                return def
            })
        })
    }

    const removeDefinition = (definitionIndex: number) => {
        setForm({
            ...form, definitions: form.definitions.filter((_, i) => i !== definitionIndex)
        })
    }

    return (
        <ScreenLayout ref={scrollViewRef} buttons={
            <Button disabled={disabledButton} isLoading={isCreatingUserWord} onPress={() => { onCreateUserWord() }}>
                {'Save'}
            </Button>}
            contentContainerStyle={style.formBox}
            containerStyle={{ paddingBottom: 0 }}
        >
            <>
                <Input value={form.term} setValue={setTerm} label='Term' />
                <Button variant='outlined' iconLeft='add' onPress={() => addDefinition()}>
                    {"Add new definition"}
                </Button>
                {form.definitions.map((definition, index) => (
                    <DefinitionForm key={index} definition={definition} definitionIndex={index}
                        setDefinition={(definition: Definition) => setDefinition(definition, index)}
                        removeDefinition={() => removeDefinition(index)} />
                ))}
            </>
        </ScreenLayout>
    )
}

const style = StyleSheet.create({
    formBox: {
        gap: 12,
        paddingBottom: 16
    },
    termBox: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    definitionsBox: {
        gap: 12
    },
})