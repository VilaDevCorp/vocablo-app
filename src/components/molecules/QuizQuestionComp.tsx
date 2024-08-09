import React, { useContext } from 'react';
import { QuizQuestion } from '../../types/entities';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../ui/Typography/Typography';
import { QuestionOption } from '../atoms/QuestionOption';
import { QuizContext } from '../../screens/QuizScreen';
import { colors } from '../../styleVars';

export function QuizQuestionComp({ question, onAnswer }: { question: QuizQuestion, onAnswer: (nOption: number) => void }) {

    const { selectedOption, quiz } = useContext(QuizContext)

    return (
        <View style={style.mainBox}>
            <Typography variant="h2" style={{ color: colors.primary[500] }}>
                {question.question}
            </Typography>
            {question.options.map((option, index) => (
                //We only say that the question is correct if the user has already checked it
                <QuestionOption key={index} nOption={index} answer={option} onPickAnswer={() => onAnswer(index)} />
            ))}
        </View>
    )
}

const style = StyleSheet.create({
    mainBox: {
        gap: 12,
    },
})