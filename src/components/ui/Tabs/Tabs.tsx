import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Typography } from '../Typography/Typography';
import { colors } from '../../../styleVars';
import { Icon, SystemIcons } from '../Icon/Icon';


export interface TabValue<T = string> {
    label: string;
    value: T | undefined;
    icon?: SystemIcons;
}

export type TabsProps<T = string> = {
    value: T | undefined;
    setValue: (value: T | undefined) => void;
    tabs: TabValue<T>[];
}

export function Tabs<T>(tabsProps: TabsProps<T>) {

    const { value, setValue, tabs } = tabsProps;
    return (
        <View style={style.mainBox}>
            {tabs.map((tab, index) => {
                const isSelected = value === tab.value;
                return (
                    <Pressable style={[style.tabBox, {
                        borderTopLeftRadius: index === 0 ? 12 : 0, borderBottomLeftRadius: index === 0 ? 12 : 0,
                        borderTopRightRadius: index === tabs.length - 1 ? 12 : 0, borderBottomRightRadius: index === tabs.length - 1 ? 12 : 0,
                        backgroundColor: isSelected ? colors.primary[500] : colors.neutral[100]
                    }]} key={index} onPress={() => setValue(tab.value)}>
                        {tab.icon && <Icon type={tab.icon} color={isSelected ? colors.neutral[100] : colors.primary[500]} />}
                        <Typography style={{ textAlign: 'center', color: isSelected ? colors.neutral[100] : colors.primary[500] }}>{tab.label}</Typography>
                    </Pressable>
                )
            })}
        </View>
    )
}

const style = StyleSheet.create({
    mainBox: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        justifyContent: 'space-around',
    },
    tabBox: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        flexDirection: 'row',
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: colors.primary[500],
        paddingHorizontal: 8,
        gap: 4,
        paddingVertical: 8
    }
})