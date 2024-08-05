import React from 'react';
import { Definition } from '../../types/entities';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from '../ui/Typography/Typography';
import { colors } from '../../styleVars';

export function DefinitionCard({ definition, isSelected, onSelect }: { definition: Definition, isSelected: boolean, onSelect: () => void }) {
    const style = StyleSheet.create({
        mainContainer: {
            padding: 12,
            gap: 8,
            borderWidth: 1,
            backgroundColor: colors.neutral[100],
            borderColor: isSelected ? colors.accent[600] : colors.primary[500],
            borderRadius: 12,
        },
    })

    return (
        <Pressable style={style.mainContainer} onPress={() => onSelect()}>
            <Typography style={{ color: isSelected ? colors.neutral[900] : colors.neutral[700] }} variant='body'>{definition.definition}</Typography>
            {definition.example && <Typography variant='example' style={{ color: isSelected ? colors.neutral[700] : colors.neutral[500] }}>
                {definition.example}
            </Typography>}
        </Pressable>
    )
}