import React, { Dispatch, SetStateAction, useContext } from 'react';
import { CreateUserWordForm, Definition, UpdateUserWordForm } from '../../types/entities';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from '../ui/Input/Input';
import { IconButton } from '../ui/Button/IconButton';
import { colors } from '../../styleVars';
import { AddWordContext } from '../organisms/AddWordModal/AddWordModal';
import { Typography } from '../ui/Typography/Typography';

export function DefinitionForm({ definition, definitionIndex, setDefinition,
    removeDefinition
}:
    {
        definition: Definition, definitionIndex: number,
        setDefinition: (definition: Definition) => void
        removeDefinition: () => void
    }) {

    const onDelete = () => {
        removeDefinition()
    }

    const onDefinitionChange = (value: string) => {
        setDefinition({ ...definition, definition: value })
    }

    const onExampleChange = (value: string) => {
        setDefinition({ ...definition, example: value })
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

    definitionInput: {

    },
    exampleInput: {

    }
})