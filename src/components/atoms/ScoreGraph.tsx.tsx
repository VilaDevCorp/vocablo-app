import React, { useEffect, useRef, useState } from 'react';
import { Circle, Svg } from 'react-native-svg';
import { colors } from '../../styleVars';
import { Icon } from '../ui/Icon/Icon';
import { Animated, StyleSheet, Text, View } from 'react-native';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedText = Animated.createAnimatedComponent(Text);

export function ScoreGraph({ size = 120, percentage }: { size?: number, percentage: number }) {

    const RADIUS = size / 2.5;
    const CIRCUNFERENCE = 2 * Math.PI * RADIUS;
    const circleCompletion = useRef(new Animated.Value(0)).current;
    const [textScore, setTextScore] = useState<number>(0)


    const startAnimation = () => Animated.timing(circleCompletion, {
        toValue: percentage,
        duration: 1500,
        useNativeDriver: false
    }).start();


    useEffect(() => {
        circleCompletion.addListener((e) => setTextScore(e.value))
        startAnimation();
        return () => circleCompletion.removeAllListeners()
    }, [])

    const colorInterpolation = circleCompletion.interpolate({
        inputRange: [0, 25, 35, 49, 50, 65, 66],
        outputRange: [colors.error[500]!, colors.error[500]!,
        colors.warning[500]!, colors.warning[500]!, colors.primary[500]!,
        colors.primary[500]!, colors.success[500]!],
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp'
    })

    return (
        <AnimatedSvg width={size} height={size} color={colorInterpolation}>
            <AnimatedCircle cx={size / 2} cy={size / 2} r={RADIUS} stroke={"currentColor"}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeWidth={2} strokeDasharray={[percentage > 0 ?
                    circleCompletion.interpolate({ inputRange: [0, 100], outputRange: [0, CIRCUNFERENCE] })
                    : 0, 10000]}
                fill={'transparent'} >
            </AnimatedCircle>
            <View style={{
                width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center',
                alignItems: 'center'
            }} >
                <AnimatedText style={[style.text, { color: colorInterpolation }]}>{textScore.toFixed(0)}</AnimatedText>
            </View>
        </ AnimatedSvg>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 32,
        textAlignVertical: 'center',
        lineHeight: 40,
        fontFamily: 'MerriweatherSans-Regular',
        color: colors.primary[500],
    },
})