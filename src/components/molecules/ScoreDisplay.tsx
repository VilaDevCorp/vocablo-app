import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styleVars';
import { ScoreGraph } from '../atoms/ScoreGraph.tsx';


interface ScoreMessage {
    title: string,
    message: string
}

export function ScoreDisplay({ score, showMessage, isPercentage }: { score: number | undefined, showMessage?: boolean, isPercentage?: boolean }) {

    const message = getMessage(score)
    const color = getColor(score)
    const textOpacity = useRef(new Animated.Value(0)).current

    const showText = () => {
        Animated.timing(textOpacity, {
            toValue: 1,
            easing: Easing.ease,
            delay: 1500,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        showMessage && showText()
    }, [])

    return (
        <View style={style.mainBox}>
            <ScoreGraph percentage={score ? score : 0} isPercentage={isPercentage} />
            {showMessage && <Animated.View style={[style.textBox, { opacity: textOpacity }]} >
                <Text style={[style.title]} >{message.title}</Text>
                <Text style={[style.message]}>{message.message}</Text>
            </Animated.View>}
        </View >
    )
}

const getMessage = (score: number | undefined): ScoreMessage => {
    if (score === undefined) {
        return {
            title: '',
            message: ''
        }
    } else if (score <= 25) {
        return {
            title: "Don't give up!",
            message: 'Review your mistakes and try again.'
        }
    } else if (score <= 50) {
        return {
            title: 'Keep going!',
            message: "You're making progress, Review and practice more."
        }
    }
    else if (score <= 70) {
        return {
            title: 'Nice work!',
            message: 'Keep practicing to master these words.'
        }
    }
    else {
        return {
            title: 'Awesome!',
            message: 'You dominate these words.'
        }
    }
}

const getColor = (score: number | undefined) => {
    if (score === undefined) {
        return 'black'
    } else if (score <= 25) {
        return colors.error[500]
    } else if (score <= 50) {
        return colors.warning[500]
    }
    else if (score <= 70) {
        return colors.primary[500]
    }
    else {
        return colors.success[500]
    }
}


const style = StyleSheet.create({
    mainBox: {
        alignItems: 'center',
    },
    textBox: {
        gap: 16,
    },
    title: {
        fontSize: 32,
        fontFamily: 'MerriweatherSans-Regular',
        textAlign: 'center',
        color: colors.neutral[900]
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.neutral[700],
        fontFamily: 'MerriweatherSans-Regular',

    }
})