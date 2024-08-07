import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Slider } from '../components/ui/Slider/Slider';
import { Button } from '../components/ui/Button/Button';
import { ScreenLayout } from '../components/organisms/ScreenLayout';


export function QuizScreen() {

    const [val, setval] = useState(0)

    return (
        <ScreenLayout buttons={<Button onPress={() => false}>{"Start quiz"}</Button>} >
            <Slider value={val} setValue={setval} label='Number of words' />

        </ScreenLayout>
    );
}