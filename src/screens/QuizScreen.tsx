import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Slider } from '../components/ui/Slider/Slider';
import { Button } from '../components/ui/Button/Button';
import { ScreenLayout } from '../components/organisms/ScreenLayout';
import { useCrud } from '../hooks/useCrud';
import { CreateQuizForm, Quiz, UserWord, UserWordSearchForm } from '../types/entities';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
import { useToast } from '../hooks/useToast';
import { QuizModal } from '../components/organisms/QuizModal/QuizModal';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../components/ui/Typography/Typography';
import { Icon } from '../components/ui/Icon/Icon';
import { colors } from '../styleVars';
import { Message } from '../components/atoms/Message';

interface QuizContext {
    quiz: Quiz | undefined
    setQuiz: (quiz: Quiz | undefined) => void
    selectedOption: number | undefined
    setSelectedOption: (option: number | undefined) => void
    currentQuestion: number
    setCurrentQuestion: Dispatch<SetStateAction<number>>
}

export const QuizContext = createContext<QuizContext>({} as QuizContext)

export function QuizScreen() {

    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)
    const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [nQuestions, setNQuestions] = useState(4)

    const { search: searchUserWords } = useCrud<UserWord>("userword")
    const { create: createQuiz } = useCrud<Quiz>('quiz')
    const { showToast } = useToast()

    useEffect(() => {
        if (!quiz) {
            setSelectedOption(undefined)
            setCurrentQuestion(0)
        }
    }, [quiz])



    const { data: nUserWords, refetch: reloadNUserWords, status: nUserWordQueryStatus } = useQuery<number>({
        queryKey: ['userNUserWords'],
        queryFn: async () => {
            const pageResult = await searchUserWords(0, null, { learned: false, count: true } as UserWordSearchForm)
            return pageResult.nElements
        }
    })
    useRefreshOnFocus(reloadNUserWords)

    const { mutate: onCreateQuiz, isPending: isCreatingQuiz } = useMutation({
        mutationFn: async () => {
            const quiz = await createQuiz({ nQuestions: nQuestions } as CreateQuizForm)
            setQuiz(quiz)
        },
        onError: () => { showToast('There was an error creating the quiz', 'alert', 'error') }
    })


    return (
        <QuizContext.Provider value={{ quiz, setQuiz, selectedOption, setSelectedOption, currentQuestion, setCurrentQuestion }} >
            <ScreenLayout isStickyButtons={false} containerStyle={{ paddingBottom: 16 }} buttons={<Button disabled={(nUserWords === undefined || nUserWords < 4)} onPress={() => onCreateQuiz()}>{"Start quiz"}</Button>} >
                {nUserWordQueryStatus === 'error' ?
                    <View style={{ marginTop: 50 }}>
                        <Message type='alert'
                            message={"Quiz is not available due to server error"} />
                    </View>
                    :
                    !nUserWords || nUserWords < 4 ?
                        <Message type='info' message={`You need at least 4 not learned words to start a quiz. (You only have ${nUserWords})`} />
                        :
                        <Slider value={nQuestions} setValue={setNQuestions} minVal={4} maxVal={nUserWords ? nUserWords : 4} label='Number of words' containerStyle={{ width: '90%', alignSelf: 'center' }} />
                }
            </ScreenLayout>
            {quiz && <QuizModal />}
        </QuizContext.Provider>
    );
}

const style = StyleSheet.create({
    alertMessage: {
        alignItems: 'center'
    },
})