import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../ui/Button/IconButton';
import { Typography } from '../ui/Typography/Typography';

export function ModalHeader({ onClose, title }: { onClose: () => void, title?: string }) {


    return (
        <View style={style.mainBox}>
            <View style={style.titleAndBack}>
                <Typography variant='h2' >{title}</Typography>
            </View>
            <IconButton variant='ghost' icon='close' onPress={() => onClose()} />
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