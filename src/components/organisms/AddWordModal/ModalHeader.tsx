import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../../ui/Typography/Typography';
import { IconButton } from '../../ui/Button/IconButton';
import { colors } from '../../../styleVars';
import { ParamListBase } from '@react-navigation/native';

interface ModalHeaderProps extends NativeStackHeaderProps {
    customGoBack?: (navigation: NativeStackNavigationProp<ParamListBase>) => void
}

export function ModalHeader(props: ModalHeaderProps) {

    const { navigation, route, customGoBack } = props


    const onClose = () => {
        navigation.getParent()?.navigate('Home')
    }

    return (
        <View style={style.mainBox}>
            <View style={style.titleAndBack}>
                {navigation.getState().index > 0 && <IconButton variant='ghost'
                    icon='arrow-left' onPress={() => customGoBack
                        ? customGoBack(navigation)
                        : navigation.goBack()} />}
                <Typography variant='h2' >{"Add word"}</Typography>
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
        backgroundColor: colors.neutral[200],
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    titleAndBack: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    }
})