import React, { useContext } from 'react';
import { Definition } from '../../types/entities';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from '../ui/Input/Input';
import { IconButton } from '../ui/Button/IconButton';
import { colors } from '../../styleVars';
import { AddWordContext } from '../organisms/AddWordModal/AddWordModal';
import { Typography } from '../ui/Typography/Typography';

export function DefinitionForm({ definition, definitionIndex }:
    { definition: Definition, definitionIndex: number }) {

    const { setForm } = useContext(AddWordContext)

    const onDelete = () => {
        setForm((form) => {
            return { ...form, definitions: form.definitions.filter((_, i) => i !== definitionIndex) }
        })
    }

    const onDefinitionChange = (value: string) => {
        setForm((form) => {
            return {
                ...form, definitions: form.definitions.map((def, i) => {
                    if (i === definitionIndex) {
                        return { ...def, definition: value }
                    }
                    return def
                })
            }
        })
    }

    const onExampleChange = (value: string) => {
        setForm((form) => {
            return {
                ...form, definitions: form.definitions.map((def, i) => {
                    if (i === definitionIndex) {
                        return { ...def, example: value }
                    }
                    return def
                })
            }
        }
        )
    }

    return (
        <View style={style.mainContainer}>
            <View style={style.numberAndButtonBox}>
                <Typography variant='definitionIndex'>{definitionIndex + 1}</Typography>
                <IconButton icon='trash' variant='ghost' fontColor={colors.error[500]}
                    onPress={() => onDelete()} />
            </View>

            <Input style={style.definitionInput} label='Definition' value={definition.definition}
                setValue={onDefinitionChange} isTextArea />
            <Input style={style.exampleInput} label='Example' value={definition.example}
                setValue={onExampleChange} isTextArea />
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {

    },
    numberAndButtonBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    definitionIndex: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: colors.primary[500],
        color: colors.neutral[100],
        fontSize: 28,
        textAlign: 'center',
        verticalAlign: 'top',
        textAlignVertical: 'top',
        fontFamily: 'MerriweatherSans-Regular',
        lineHeight: 35
    },
    definitionInput: {

    },
    exampleInput: {

    }
})