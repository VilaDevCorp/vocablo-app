import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from '../../ui/Modal/Modal';
import { Button } from '../../ui/Button/Button';
import { ScreenLayout } from '../ScreenLayout';
import { QuizQuestionComp } from '../../molecules/QuizQuestionComp';
import { QuizContext } from '../../../screens/QuizScreen';
import { Typography } from '../../ui/Typography/Typography';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../hooks/useApi';
import { ScoreDisplay } from '../../molecules/ScoreDisplay';

export function QuizModal() {

    const { quiz, setQuiz, selectedOption, setSelectedOption, currentQuestion, setCurrentQuestion } = useContext(QuizContext)

    const totalQuestions = quiz ? quiz.questions.length : 0
    const answeredQuestion = quiz ? quiz.questions[currentQuestion].answerPos !== null : false
    const [score, setScore] = useState<number | undefined>(undefined)

    const { sendQuiz } = useApi()

    const { mutate: finishQuiz } = useMutation({
        mutationFn: async () => {
            if (quiz) {
                const score = await sendQuiz(quiz)
                setScore(score)
            }
        }
    })

    const selectOption = (nOption: number) => {
        setSelectedOption(nOption)
    }

    const onNext = () => {
        if (!quiz) return
        if (currentQuestion < totalQuestions - 1) {
            setSelectedOption(undefined)
            setCurrentQuestion((old) => old + 1)
        } else {
            finishQuiz()
        }
    }

    const checkAnswer = () => {
        if (!quiz) return
        if (selectedOption === undefined) return
        const newQuiz = { ...quiz }
        newQuiz.questions[currentQuestion].answerPos = selectedOption
        setQuiz(newQuiz)
    }



    return (
        <Modal title={score ? "Result" : `${currentQuestion + 1}/${totalQuestions}`} onClose={() => setQuiz(undefined)}>
            {quiz &&
                <ScreenLayout isStickyButtons containerStyle={{ paddingBottom: 16 }} buttons={
                    score !== undefined ?
                        <Button onPress={() => setQuiz(undefined)}>
                            {"Finish quiz"}
                        </Button>
                        :
                        answeredQuestion ?
                            <Button onPress={onNext}>
                                {currentQuestion < totalQuestions - 1 ? "Next" : "Check score"}
                            </Button>
                            :
                            <Button disabled={selectedOption === undefined} onPress={() => checkAnswer()} >
                                {"Answer"}
                            </Button>
                }>
                    {score === undefined ?
                        quiz.questions[currentQuestion] &&
                        <QuizQuestionComp
                            question={quiz.questions[currentQuestion]}
                            onAnswer={selectOption}
                        />
                        :
                        <ScoreDisplay score={score} />
                    }
                </ScreenLayout >
            }
        </Modal >
    )
}

const style = StyleSheet.create({

})