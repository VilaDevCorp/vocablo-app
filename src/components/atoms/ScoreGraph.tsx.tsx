import React, { useEffect, useRef, useState } from 'react';
import { Circle, Svg } from 'react-native-svg';
import { colors } from '../../styleVars';
import { Animated, StyleSheet, Text, View } from 'react-native';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedText = Animated.createAnimatedComponent(Text);

export function ScoreGraph({ size = 120, percentage, isPercentage }: { size?: number, percentage: number, isPercentage?: boolean }) {

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
        outputRange: [colors.error[500] as string, colors.error[500] as string,
        colors.warning[500] as string, colors.warning[500] as string, colors.primary[500] as string,
        colors.primary[500] as string, colors.success[500] as string],
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
                <AnimatedText style={[style.text, {
                    color: colorInterpolation, fontSize: isPercentage ? 24 : 32,
                    lineHeight: isPercentage ? 28 : 40
                }]}>{textScore.toFixed(0) + (isPercentage ? "%" : "")}</AnimatedText>
            </View>
        </ AnimatedSvg>
    )
}

const style = StyleSheet.create({
    text: {
        textAlignVertical: 'center',
        fontFamily: 'MerriweatherSans-Regular',
        color: colors.primary[500],
    },
})