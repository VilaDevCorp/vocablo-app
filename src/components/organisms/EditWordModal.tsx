import React, { useRef, useState } from 'react';
import { Modal } from '../ui/Modal/Modal';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Definition, UpdateUserWordForm, UserWord } from '../../types/entities';
import { Input } from '../ui/Input/Input';
import { Button } from '../ui/Button/Button';
import { DefinitionForm } from '../molecules/DefinitionForm';
import { useCrud } from '../../hooks/useCrud';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import { ScreenLayout } from './ScreenLayout';

export function EditWordModal({ word, onClose }: { word: UserWord, onClose: () => void }) {

    const { update: updateUserWord } = useCrud<UserWord>('userword')

    const { showToast } = useToast()

    const [form, setForm] = useState<UpdateUserWordForm>
        ({ id: word.id, term: word.term, definitions: word.definitions })

    const scrollViewRef = useRef<ScrollView>(null)

    const addDefinition = () => {
        setForm({
            ...form,
            definitions: form.definitions ?
                [...form.definitions, { definition: '', example: '' }]
                : [{ definition: '', example: '' }]
        })
        scrollViewRef.current?.scrollToEnd()
    }

    const queryClient = useQueryClient()

    const { mutate: onUpdateUserWord, isPending: isUpdatingWord } = useMutation({
        mutationFn: () => {
            if (form.term !== '' && form.definitions.length > 0
                && form.definitions.some(def => def.definition !== '')) {
                return updateUserWord(form)
            }
            return new Promise((resolve, reject) => reject());
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userwordDetails'] });
            showToast('Word updated!', 'check', 'success');
            onClose()
        },
        onError: () => { showToast('There was an error updating the word', 'alert', 'error') }
    })

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

    const disabledButton = form.term === '' || form.definitions?.length < 1 || form.definitions?.some(def => def.definition === '')



    return (
        <Modal title='Edit word' onClose={onClose}>
            <ScreenLayout buttons={
                <Button disabled={disabledButton} onPress={() => { onUpdateUserWord() }}>
                    {'Save'}
                </Button>
            } containerStyle={style.formBox} isScrollable>
                <Input value={form.term} setValue={(value: string) => setForm({ ...form, term: value })}
                    label='Term' />
                <Button variant='outlined' iconLeft='add' onPress={() => addDefinition()}>
                    {"Add new definition"}
                </Button>
                {form.definitions && form.definitions.map((definition, index) => (
                    <DefinitionForm key={index} definition={definition} definitionIndex={index}
                        setDefinition={(definition: Definition) => setDefinition(definition, index)}
                        removeDefinition={() => removeDefinition(index)} />
                ))}
            </ScreenLayout>
        </Modal>
    )
}

const style = StyleSheet.create({
    mainBox: {
        gap: 12,
    },
    formBox: {
        gap: 12,
    },
    termBox: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    definitionsBox: {
        gap: 12
    },
    buttonsBox: {
        gap: 8,
        justifyContent: 'flex-end',
    }
})