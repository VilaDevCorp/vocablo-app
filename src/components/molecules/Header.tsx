import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { IconButton } from '../ui/Button/IconButton';
import { Typography } from '../ui/Typography/Typography';
import { colors } from '../../styleVars';

interface HeaderProps extends NativeStackHeaderProps {
    isModal?: boolean
    customGoBack?: (navigation: NativeStackNavigationProp<ParamListBase>) => void

}

export function Header(props: HeaderProps) {

    const { navigation, customGoBack, isModal, options } = props


    const onClose = () => {
        navigation.getParent()?.navigate('Home')
    }

    return (
        <View style={[style.mainBox]}>
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "transparent",
    },
    titleAndBack: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    }
})