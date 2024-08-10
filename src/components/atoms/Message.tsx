import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../styleVars';
import { Icon, SystemIcons } from '../ui/Icon/Icon';
import { Typography } from '../ui/Typography/Typography';

type MessageType = 'alert' | 'info' | 'not-found'

const getIcon = (type: MessageType): SystemIcons => {
    switch (type) {
        case 'alert':
            return 'alert'
        case 'info':
            return 'info'
        case 'not-found':
            return 'search-x'
    }
}

const getColor = (type: MessageType) => {
    switch (type) {
        case 'alert':
            return colors.error[500]
        case 'info':
            return colors.primary[500]
    }
}

export function Message({ type, message }: { type: MessageType, message: string | undefined }) {
    return (
        <View style={style.alertMessage}>
            <Icon type={getIcon(type)} size={54} color={getColor(type)} />
            <Typography style={{ textAlign: 'center', fontSize: 16 }}
                variant={'important'}>{message || ''}
            </Typography>
        </View>
    )
}

const style = StyleSheet.create({
    alertMessage: {
        alignItems: 'center',
        gap: 8,
    },
})