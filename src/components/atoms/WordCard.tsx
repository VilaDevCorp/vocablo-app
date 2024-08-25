import React from 'react';
import { UserWord } from '../../types/entities';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Typography } from '../ui/Typography/Typography';
import { colors } from '../../styleVars';
import { Progress } from './Progress';
export function WordCard({ word, onPress }:
    { word: UserWord, onPress: (id: string) => void }) {

    return (
        <Pressable style={style.mainBox} onPress={() => onPress(word.id)}>
            <View style={style.nameAndProgress}>
                <Typography style={{ color: colors.primary[500] }} variant='h2'>{word.term}</Typography>
                {word.learningProgress ? <Progress size={24} percentage={word.learningProgress} />
                    : <Text style={{ color: colors.primary[400] }}>{"NEW"}</Text>
                }
            </View>
            {word.definitions && word.definitions.length > 0 &&
                <View style={style.definitionAndExample}>
                    <Typography nLines={3}  style={style.definitionText}  variant='body'>{word.definitions[0].definition}</Typography>
                </View>
            }
        </Pressable >
    )
}

const style = StyleSheet.create({
    mainBox: {
        backgroundColor: colors.neutral[100],
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary[500],
        padding: 12,
        maxHeight: 150,
        gap: 8,
        overflow: 'hidden',
    },
    nameAndProgress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    definitionAndExample: {
        height: 'auto',
    },
    definitionText: {
    }

})