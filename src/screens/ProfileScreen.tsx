import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button/Button';
import { Header } from '../components/ui/Button/Header/Header';
import { Icon } from '../components/ui/Icon/Icon';
import { colors } from '../styleVars';
import { Typography } from '../components/ui/Typography/Typography';
import { UserProgress } from '../components/molecules/UserProgress';
import { ScreenLayout } from '../components/organisms/ScreenLayout';


export function ProfileScreen() {
    const { user, logout } = useAuth();
    return (
        <ScreenLayout isScrollable={true} contentContainerStyle={{}}>
            <Header title="Info" />
            <View style={{ gap: 16, marginBottom: 16 }}>
                <View style={style.infoElement}>
                    <Icon type="user" size={25} color={colors.neutral[700]} />
                    <Typography>{user?.username}</Typography>
                </View>
                <View style={style.infoElement}>
                    <Icon type="mail" size={25} color={colors.neutral[700]} />
                    <Typography>{user?.email}</Typography>
                </View>
                <Button variant='outlined' onPress={logout}>Logout</Button>
            </View>
            <UserProgress />
        </ScreenLayout>
    );
}


const style = StyleSheet.create({
    infoElement: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
})