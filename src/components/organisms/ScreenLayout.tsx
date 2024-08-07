import React, { forwardRef, Ref } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';


export interface ScreenLayoutProps {
    children: React.ReactNode;
    buttons?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>
    isStickyButtons?: boolean
    isScrollable?: boolean
}


export const ScreenLayout = forwardRef((props: ScreenLayoutProps, ref: Ref<ScrollView>) => {
    const { children, buttons, isStickyButtons, containerStyle, isScrollable = true } = props;
    return (
        <View style={style.mainBox}>
            {isScrollable ?
                <ScrollView style={{ flex: 1 }} contentContainerStyle={[containerStyle, { flexGrow: 1 }]}
                    ref={ref}>
                    {children}
                    {!isStickyButtons && <View style={style.buttonBox}>{buttons}</View>}
                </ScrollView>
                : <View style={[{ flex: 1 }, containerStyle]}>
                    {children}
                    {buttons && !isStickyButtons && <View style={style.buttonBox}>{buttons}</View>}
                </View>
            }
            {buttons && isStickyButtons && <View style={style.stickyButtonsBox}>{buttons}</View>}
        </View >
    )
})

const style = StyleSheet.create({
    mainBox: {
        flex: 1,
        gap: 16
    },
    buttonBox: {
        marginTop: 16,
        gap: 8,
        flex: 1,
        justifyContent: 'flex-end',
    },
    stickyButtonsBox: {
    }

})