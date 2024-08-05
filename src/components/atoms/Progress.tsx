import React from 'react';
import { Circle, Svg } from 'react-native-svg';
import { colors } from '../../styleVars';
import { Icon } from '../ui/Icon/Icon';
import { View } from 'react-native';


export function Progress({ size, percentage }: { size: number, percentage: number }) {

    const radius = size / 3;

    const getColor = () => {
        if (percentage < 50) return colors.error[500];
        return colors.success[700];
    }

    return (
        <Svg width={size} height={size} >
            <Circle cx={size / 2} cy={size / 2} r={radius} stroke={getColor()}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeWidth={2} strokeDasharray={[percentage > 0 ?
                    2 * Math.PI * radius * (percentage / 100)
                    : 0, 10000]}
                fill={'transparent'} >
            </Circle>
            {percentage === 100 &&
                <View style={{
                    width: '100%', height: '100%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <Icon type='check' size={size / 2} color={colors.success[900]} />
                </View>
            }
        </Svg>
    )
}