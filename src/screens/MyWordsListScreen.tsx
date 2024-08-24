import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Input } from '../components/ui/Input/Input';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useCrud } from '../hooks/useCrud';
import { UserWord, UserWordSearchForm } from '../types/entities';
import { Page } from '../types/types';
import { WordCard } from '../components/atoms/WordCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MyWordsStackNavList } from '../types/navProps';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
import { ScreenLayout } from '../components/organisms/ScreenLayout';
import { WordCardSkeleton } from '../components/atoms/WordCardSkeleton';
import { Message } from '../components/atoms/Message';
import { FlatListLoadingIndicator } from '../components/atoms/FlatListLoadingIndicator';



export function MyWordsListScreen() {

    const [searchTerm, setSearchTerm] = useState<string>("")

    const { search: searchUserWords } = useCrud<UserWord>("userword");

    const firstRender = useRef<boolean>(true)

    const { navigate } = useNavigation<NavigationProp<MyWordsStackNavList>>()

    const { data: userWordPages, refetch: refetchUserWords, status, isFetching: isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Page<UserWord>>({
        queryKey: ['myuserwords'],
        placeholderData: keepPreviousData,
        meta: {
            errorInfo: 'Error fetching your words'
        },
        initialPageParam: 0,
        queryFn: ({ pageParam }) => searchUserWords(pageParam as number, 15, { term: searchTerm } as UserWordSearchForm),
        getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
        enabled: false,
    })

    useRefreshOnFocus(refetchUserWords)

    useEffect(() => {
        refetchUserWords()
    }, [])


    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const timeout = setTimeout(async () => {
            await refetchUserWords()
        }, 500)
        return () => {
            clearTimeout(timeout)
        }
    }, [searchTerm])


    return (
        <ScreenLayout isScrollable={false} containerStyle={{ paddingBottom: 0 }} contentContainerStyle={style.mainBox}>
            <Input value={searchTerm} setValue={setSearchTerm} placeholder='Search'
                placeholderIcon='search' />
            {status === 'error' ?
                <View style={{marginTop:50}}>
                    <Message type='alert'
                        message={"There was an error fetching your words."} />
                </View>
                : firstRender.current || (isLoading && !isFetchingNextPage) ?
                    <ScrollView contentContainerStyle={style.wordList}>
                        {Array.from(Array(10).keys()).map((_, index) => <WordCardSkeleton key={index} />)}
                    </ScrollView>
                    :
                    userWordPages?.pages[0].nElements === 0 ?
                        <View style={{ marginTop: 24 }}>
                            <Message type='not-found'
                                message={"No results found."} />
                        </View>
                        :
                        <>
                            <FlatList contentContainerStyle={style.wordList}
                                data={userWordPages?.pages.flatMap(page => page.content)}
                                onEndReached={() => fetchNextPage()}
                                onEndReachedThreshold={0.05}
                                renderItem={({ item }) =>
                                    <WordCard word={item}
                                        onPress={(id: string) => navigate("WordDetails", { userWordId: id })} />
                                } />
                            {isFetchingNextPage ? <FlatListLoadingIndicator /> : undefined}
                        </>
            }
        </ScreenLayout>
    );
}



const style = StyleSheet.create({
    mainBox: {
        gap: 12
    },
    wordList: {
        gap: 12,
        paddingBottom: 16
    }
})