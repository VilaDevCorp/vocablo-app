import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Typography } from '../ui/Typography/Typography';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

interface HeaderProps extends BottomTabHeaderProps {
    containerStyle?: StyleProp<ViewStyle>
}

export function BottomTabsHeader(props: HeaderProps) {

    const { containerStyle, options } = props

    return (
        <View style={[style.mainBox, containerStyle]}>
            <View style={style.titleAndBack}>
                <Typography variant='h2' >{options.title}</Typography>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: "transparent",
    },
    titleAndBack: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    }
})