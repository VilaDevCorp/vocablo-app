import React, { ReactNode } from 'react';
import { Modal as NativeModal, View } from 'react-native';
import { ModalHeader } from '../../molecules/ModalHeader';
import { colors } from '../../../styleVars';

export function Modal({ children, title, onClose }: { children: ReactNode, title?: string, onClose: () => void }) {
    return (
        <NativeModal >
            <View style={{ padding: 16, paddingBottom:0, flex: 1, backgroundColor: colors.neutral[200] }}>
                <ModalHeader title={title} onClose={onClose} />
                {children}
            </View>
        </NativeModal>
    )
}