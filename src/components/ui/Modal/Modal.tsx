import React, { ReactNode } from 'react';
import { Modal as NativeModal, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { IconButton } from '../Button/IconButton';
import { ModalHeader } from '../../molecules/ModalHeader';

export function Modal({ children, title, onClose }: { children: ReactNode, title?: string, onClose: () => void }) {
    return (
        <NativeModal>
            <View style={{ padding: 16, flex: 1 }}>
                <ModalHeader title={title} onClose={onClose} />
                {children}
            </View>
        </NativeModal>
    )
}