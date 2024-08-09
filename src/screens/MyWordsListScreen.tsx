import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Typography } from '../components/ui/Typography/Typography';
import { Input } from '../components/ui/Input/Input';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCrud } from '../hooks/useCrud';
import { UserWord, UserWordSearchForm } from '../types/entities';
import { Page } from '../types/types';
import { WordCard } from '../components/atoms/WordCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MyWordsStackNavList } from '../types/navProps';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
import { ScreenLayout } from '../components/organisms/ScreenLayout';
import { Button } from '../components/ui/Button/Button';



export function MyWordsListScreen() {

    const [searchKeyword, setSearchKeyword] = useState<string>("")

    const { search: searchUserWords } = useCrud<UserWord>("userword");

    const { navigate } = useNavigation<NavigationProp<MyWordsStackNavList>>()

    const { data: userWordPages, refetch: refetchUserWords } = useInfiniteQuery<Page<UserWord>>({
        queryKey: ['myuserwords', searchKeyword],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => searchUserWords(pageParam as number, 10, { term: searchKeyword } as UserWordSearchForm),
        getNextPageParam: (lastPage) => lastPage.hasNext
    })

    useRefreshOnFocus(refetchUserWords)

    return (
        <ScreenLayout isScrollable={false} containerStyle={style.mainBox}>
            <Input value={searchKeyword} setValue={setSearchKeyword} placeholder='Search'
                placeholderIcon='search' />
            <FlatList contentContainerStyle={style.wordList} data={userWordPages?.pages.flatMap(page => page.content)} renderItem={({ item }) => {
                return <WordCard word={item} onPress={(id: string) => navigate("WordDetails", { userWordId: id })} />
            }} />
        </ScreenLayout>
    );
}



const style = StyleSheet.create({
    mainBox: {
        gap: 12
    },
    wordList: {
        gap: 12
    }
})