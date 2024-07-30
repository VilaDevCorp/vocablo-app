import React, { ReactNode } from 'react';
import { Modal as NativeModal, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { IconButton } from '../Button/IconButton';

export function Modal({ children, title, onClose }: { children: ReactNode, title?: string, onClose: () => void }) {
    return (
        <NativeModal>
            <View style={{ padding: 16, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 12 }}>
                    <Typography variant="h2">{title}</Typography>
                    <IconButton variant='ghost' icon='close' onPress={onClose} />
                </View>
                {children}
            </View>
        </NativeModal>
    )
}