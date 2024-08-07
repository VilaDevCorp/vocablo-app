import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { IconButton } from '../ui/Button/IconButton';
import { Typography } from '../ui/Typography/Typography';

interface HeaderProps extends NativeStackHeaderProps {
    isModal?: boolean
    customGoBack?: (navigation: NativeStackNavigationProp<ParamListBase>) => void
    containerStyle?: StyleProp<ViewStyle>
}

export function StackHeader(props: HeaderProps) {

    const { navigation, customGoBack, isModal, options, containerStyle } = props

    const onClose = () => {
        navigation.getParent()?.navigate('Home')
    }

    return (
        <View style={[style.mainBox, containerStyle]}>
            <View style={style.titleAndBack}>
                {navigation.getState().index > 0 && <IconButton variant='ghost'
                    icon='arrow-left' onPress={() => customGoBack
                        ? customGoBack(navigation)
                        : navigation.goBack()} />}
                <Typography variant='h2' >{options.title}</Typography>
            </View>
            {isModal && <IconButton variant='ghost' icon='close' onPress={() => onClose()} />}
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