import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../../assets/logo.svg';
import { LoadingIcon } from '../components/ui/Icon/icons/LoadingIcon';


export function InitScreen() {

    return (
        <View style={style.mainBox}>
            <Logo width={'100%'} height={200} />
            <LoadingIcon size={40} />
        </View>
    )
}


const style = StyleSheet.create({
    mainBox:{
        width: '100%',
        height: '100%',
        marginTop: '25%',
        alignItems: 'center'},
})