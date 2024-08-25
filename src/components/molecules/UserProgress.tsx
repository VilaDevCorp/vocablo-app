import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useApi } from '../../hooks/useApi';
import { Typography } from '../ui/Typography/Typography';
import { ProgressWordsDisplay } from '../atoms/ProgressWordsDisplay';
import { colors } from '../../styleVars';
import { Progress } from '../atoms/Progress';
import { ScoreDisplay } from './ScoreDisplay';
import { Header } from '../ui/Button/Header/Header';
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';
import { LoadingIcon } from '../ui/Icon/icons/LoadingIcon';

export function UserProgress() {

    const { getUserProgress } = useApi()

    const { data: userProgress, refetch: refetchUserProgress, isFetching} = useQuery({ queryKey: ['userProgress'], queryFn: getUserProgress })

    useRefreshOnFocus(refetchUserProgress)


    return (
        <View style={{ gap: 0 }}>
            <Header title="My progress" />
            {isFetching ?
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <LoadingIcon size={40} />
                </View>
                :
                <>
                    <ProgressWordsDisplay number={userProgress?.totalWords || 0} text='added words' color={colors.primary[500]} />
                    <View style={{ marginTop: 16, gap: 16 }}>
                        <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
                            <ProgressWordsDisplay number={userProgress?.learnedWords || 0} text='learned words' color={colors.success[500]} />
                            <ProgressWordsDisplay number={userProgress?.unlearnedWords || 0} text='words to learn' color={colors.warning[500]} />
                        </View>
                        <ScoreDisplay score={userProgress ? userProgress.learnedWords / userProgress.totalWords * 100 : 0} isPercentage />
                    </View>
                </>
            }
        </View>
    )
}

const style = StyleSheet.create({
    mainBox: {
        flexDirection: 'column',
    }
})