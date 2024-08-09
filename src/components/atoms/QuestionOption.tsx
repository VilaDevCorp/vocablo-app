import React, { useContext } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Typography } from '../ui/Typography/Typography';
import { colors } from '../../styleVars';
import { QuizContext } from '../../screens/QuizScreen';

export function QuestionOption({ nOption, answer, onPickAnswer }: { nOption: number, answer: string, onPickAnswer: () => void }) {

    const { quiz, currentQuestion, selectedOption } = useContext(QuizContext)

    const isQuestionAnswered = quiz ? quiz.questions[currentQuestion].answerPos !== null : false
    const isOptionSelected = selectedOption === nOption
    const isOptionCorrect = quiz ? nOption === quiz.questions[currentQuestion].correctOptionPos : false

    const getOptionStyle = () => {
        if (isQuestionAnswered) {
            if (isOptionSelected) {
                if (isOptionCorrect) {
                    return style.selectedCorrectOption
                } else {
                    return style.selectedIncorrectOption
                }
            } else {
                if (isOptionCorrect) {
                    return style.notSelectedCorrectOption
                }
            }
        } else {
            if (isOptionSelected) {
                return style.selectedOption
            }
        }
    }
    return (
        <Pressable style={[style.mainBox, getOptionStyle()]} onPress={isQuestionAnswered ? () => false : () => onPickAnswer()}>
            <Typography variant="body" style={isOptionSelected ? style.selectedOptionText : style.text}>
                {answer}
                {isOptionCorrect ? " (Correct)" : "Incorrect"}
            </Typography>
        </Pressable>
    )

}

const style = StyleSheet.create({
    mainBox: {
        borderWidth: 2,
        borderColor: colors.primary[500],
        backgroundColor: "transparent",
        padding: 12,
        borderRadius: 12,
    },
    selectedOption: {
        borderColor: colors.accent[600],
    },
    selectedCorrectOption: {
        borderColor: colors.success[100],
        backgroundColor: colors.success[100],
    },
    selectedIncorrectOption: {
        borderColor: colors.error[100],
        backgroundColor: colors.error[100],
    },
    notSelectedCorrectOption: {
        borderColor: colors.success[500],
    },
    text: {
        color: colors.neutral[700]
    },
    selectedOptionText: {
        color: colors.neutral[900]
    }

})