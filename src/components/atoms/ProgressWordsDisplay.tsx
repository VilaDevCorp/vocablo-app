import React from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { Typography } from '../ui/Typography/Typography';

export function ProgressWordsDisplay({ number, text, color }: { number: number, text: string, color: ColorValue }) {

    return (
        <View style={style.mainBox}>
            <Typography style={{ color: color, fontSize: 36, lineHeight: undefined }} >{number}</Typography>
            <Typography style={{ color: color, fontSize: 20, lineHeight: undefined }} >{text}</Typography>
        </View>
    )
}


const style = StyleSheet.create({
    mainBox: {
        width: '100%',
        flex:1,
        alignItems: 'center',
    },
})