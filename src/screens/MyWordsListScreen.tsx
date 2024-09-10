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
import { learnedValues, orderByValues, WordFiltersModal } from '../components/organisms/WordFiltersModal';
import { WordCardSkeleton } from '../components/atoms/WordCardSkeleton';
import { Message } from '../components/atoms/Message';
import { FlatListLoadingIndicator } from '../components/atoms/FlatListLoadingIndicator';
import { Button } from '../components/ui/Button/Button';
import { IconButton } from '../components/ui/Button/IconButton';
import { Typography } from '../components/ui/Typography/Typography';
import { Icon } from '../components/ui/Icon/Icon';
import { colors } from '../styleVars';



export function MyWordsListScreen() {

    const { search: searchUserWords } = useCrud<UserWord>("userword");

    const firstRender = useRef<boolean>(true)

    const { navigate } = useNavigation<NavigationProp<MyWordsStackNavList>>()

    const [searchForm, setSearchForm] = useState<UserWordSearchForm>({ term: "", orderBy: "creationDate", order: "desc" })
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

    const { data: userWordPages, refetch: refetchUserWords, status, isFetching: isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Page<UserWord>>({
        queryKey: ['myuserwords'],
        placeholderData: keepPreviousData,
        meta: {
            errorInfo: 'Error fetching your words'
        },
        initialPageParam: 0,
        queryFn: ({ pageParam }) => searchUserWords(pageParam as number, 15, searchForm),
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
    }, [searchForm.term])

    useEffect(() => {
        refetchUserWords()
    }, [searchForm])


    return (
        <ScreenLayout isScrollable={false} containerStyle={{ paddingBottom: 0 }} contentContainerStyle={style.mainBox}>
            <View style={{ gap: 8, flexDirection: 'row', width: '100%' }}>
                <Input boxStyle={{ flex: 1 }} value={searchForm.term} setValue={(val: string) => setSearchForm((oldForm) => { return { ...oldForm, term: val } })} placeholder='Search'
                    placeholderIcon='search' />
                <IconButton icon='filter' onPress={() => setIsFiltersModalOpen(true)} />
            </View>
            <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                    <Typography style={{ fontSize: 12 }} variant="label">{"Order by:"}</Typography>
                    <Typography style={{ fontSize: 12 }}>{orderByValues.find((element) => element.value === searchForm.orderBy)?.label}</Typography>
                    <Icon type={searchForm.orderDir === 'asc' ? 'arrow-up' : 'arrow-down'} color={colors.neutral[900]} />
                </View>
                {searchForm.learned !== undefined &&
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <Typography style={{ fontSize: 12 }} variant="label">{"Progress:"}</Typography>
                        <Typography style={{ fontSize: 12 }}>{learnedValues.find((element) => element.value === searchForm.learned)?.label}</Typography>
                    </View>
                }
            </View>

            {status === 'error' ?
                <View style={{ marginTop: 50 }}>
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
            {isFiltersModalOpen && <WordFiltersModal searchForm={searchForm} setSearchForm={(form) => setSearchForm(form)} onClose={() => setIsFiltersModalOpen(false)} />}
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