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
import { ConfirmationModal } from '../components/organisms/ConfirmationModal';
import { useConfirm } from '../hooks/useConfirm';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../hooks/useToast';


export function ProfileScreen() {
    const { user, logout, deleteAccount } = useAuth();
    const { showToast } = useToast()

    const { showConfirmationModal } = useConfirm()
    const onDeleteAccount = () => {
        showConfirmationModal(
            "Are you sure you want to delete your account?",
            () => {
                deleteAccountMutation()
            })
    }

    const { mutate: deleteAccountMutation } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            showToast("Account deleted", "alert", "success")
        },
        onError: (err) => {
            showToast("Error deleting account", "alert", "error")
        }
    })

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
                <Button variant='ghost' fontColor={colors.error[500]} onPress={onDeleteAccount}>Delete account</Button>
            </View>
            <UserProgress />
            <ConfirmationModal />
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