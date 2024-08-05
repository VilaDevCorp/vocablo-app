import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Typography } from '../components/ui/Typography/Typography';
import { Input } from '../components/ui/Input/Input';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCrud } from '../hooks/useCrud';
import { UserWord } from '../types/entities';
import { Page } from '../types/types';
import { WordCard } from '../components/atoms/WordCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MyWordsStackNavList } from '../types/navProps';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';



export function MyWordsListScreen() {

    const [searchKeyword, setSearchKeyword] = useState<string>("")

    const { search: searchUserWords } = useCrud<UserWord>("userword");

    const { navigate } = useNavigation<NavigationProp<MyWordsStackNavList>>()

    const { data: userWordPages, refetch: refetchUserWords } = useInfiniteQuery<Page<UserWord>>({
        queryKey: ['myuserwords', searchKeyword],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => searchUserWords(pageParam as number, 10, { term: searchKeyword }),
        getNextPageParam: (lastPage) => lastPage.hasNext
    })

    useRefreshOnFocus(refetchUserWords)

    return (
        <View style={style.mainBox} >
            <Typography variant='h2'>{"My words"}</Typography>
            <Input value={searchKeyword} setValue={setSearchKeyword} placeholder='Search'
                placeholderIcon='search' />
            <FlatList contentContainerStyle={style.wordList} data={userWordPages?.pages.flatMap(page => page.content)} renderItem={({ item }) => {
                return <WordCard word={item} onPress={(id: string) => navigate("WordDetails", { userWordId: id })} />
            }} />

        </View >
    );
}



const style = StyleSheet.create({
    mainBox: {
        flex: 1,
        gap: 36
    },
    wordList: {
        gap: 12
    }
})