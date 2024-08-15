import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoadingIcon } from '../ui/Icon/icons/LoadingIcon';
import { colors } from '../../styleVars';

export function FlatListLoadingIndicator() {

    return (
        <View style={style.mainBox}>
            <View style={style.iconBox}>
                <LoadingIcon size={28} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainBox: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        width: 45,
        elevation: 2,
        height: 45,
        borderRadius: 25,
        backgroundColor: colors.neutral[100],
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }
})