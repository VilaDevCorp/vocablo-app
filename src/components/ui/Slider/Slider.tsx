import React, { } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../styleVars';
import { Slider as ExtSlider } from '@miblanchard/react-native-slider';
import { Typography } from '../Typography/Typography';
import { Icon, SystemIcons } from '../Icon/Icon';

interface SliderProps {
    value: number
    setValue: (val: number) => void
    minVal?: number
    maxVal?: number
    label?: string
    icon?: SystemIcons
    disabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    hideSlider?: boolean
}

export function Slider(props: SliderProps) {
    const { value, setValue, minVal = 4, maxVal = 100, label, icon, disabled, containerStyle, hideSlider } = props


    return (
        <View style={containerStyle}>
            {label && <View style={{ flexDirection: 'row', gap: 4 }}>
                {icon && <Icon type={icon} color={colors.neutral[700]} size={24} />}
                <Typography variant="label">{props.label}</Typography></View>
            }
            <View>
                <Text style={style.valueText}>{Math.round(value)}</Text>
                {!hideSlider && <ExtSlider value={value} onValueChange={(val) => setValue(val[0])}
                    disabled={disabled}
                    step={1}
                    minimumValue={minVal} maximumValue={maxVal} thumbStyle={style.thumb}
                    minimumTrackStyle={style.filledTrack}
                    maximumTrackStyle={style.unfilledTrack}
                />
                }
            </View >
        </View>
    )
}

const style = StyleSheet.create({

    valueText: {
        color: colors.primary[500],
        textAlign: 'center',

        fontSize: 36,
        fontFamily: 'MerriweatherSans-Regular'
    },
    sliderBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filledTrack: {
        height: 6,
        backgroundColor: colors.primary[500]
    },
    unfilledTrack: {
        height: 4,
        backgroundColor: colors.neutral[500]
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 12,
        backgroundColor: colors.primary[500]
    }
})