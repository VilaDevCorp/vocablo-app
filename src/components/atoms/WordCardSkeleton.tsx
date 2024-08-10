import React from 'react';
import { UserWord } from '../../types/entities';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Typography } from '../ui/Typography/Typography';
import { colors } from '../../styleVars';
import { Progress } from './Progress';

export function WordCardSkeleton() {

    return (
        <View style={style.mainBox} >
            <View style={style.nameAndProgress}>
                <View style={style.termSkeleton} ></View>
                {/* {word.learningProgress ? <Progress size={24} percentage={word.learningProgress} />
                    : <Text style={{ color: colors.primary[400] }}>{"NEW"}</Text>
                } */}
            </View>
            <View style={style.definitionAndExample}>
                <View style={style.definitonSkeleton}></View>
                <View style={style.definitonSkeleton}></View>
            </View>
        </View>
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
    termSkeleton: {
        width: 100,
        height: 20,
        marginTop: 8,
        backgroundColor: colors.neutral[400],
        borderRadius: 12, 
        marginBottom: 8
    },
    definitonSkeleton: {
        width: '100%',
        height: 10,
        backgroundColor: colors.neutral[400],
        borderRadius: 12
    },
    definitionAndExample: {
        height: 'auto',
        gap: 8
    },
    definitionText: {

        // overflow: 'hidden
    }

})