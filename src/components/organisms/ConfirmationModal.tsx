import React from 'react';
import { Modal } from '../ui/Modal/Modal';
import { StyleSheet, View } from 'react-native';
import { Button } from '../ui/Button/Button';
import { useConfirm } from '../../hooks/useConfirm';
import { Typography } from '../ui/Typography/Typography';
import { Icon } from '../ui/Icon/Icon';
import { colors } from '../../styleVars';
import { ScreenLayout } from './ScreenLayout';

export function ConfirmationModal() {

    const { visible, message, icon, closeConfirmationModal, onConfirm } = useConfirm()

    return (
        visible &&
        <Modal onClose={() => closeConfirmationModal()}>
            <ScreenLayout isScrollable={false} buttons={
                <>
                    <Button onPress={() => closeConfirmationModal()} variant='solid'>Cancel</Button>
                    <Button onPress={onConfirm ? onConfirm : () => false} variant='ghost'
                        fontColor={colors.error[500]}>Confirm</Button>
                </>}>
                {icon && <View style={style.iconBox}>{icon}</View>}
                <Typography style={style.message} variant='body'>{message}</Typography>
            </ScreenLayout>
        </Modal>
    )
}

const style = StyleSheet.create({
    mainBox: {
        flex: 1,
    },
    iconBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    message: {
        flex: 1,
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonsBox: {
        gap: 8,
        justifyContent: 'flex-end',
    },

})