import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input } from '../../ui/Input/Input';
import { Typography } from '../../ui/Typography/Typography';
import { CreateUserWordForm, Word, WordSearchForm } from '../../../types/entities';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Page } from '../../../types/types';
import { useCrud } from '../../../hooks/useCrud';
import { colors } from '../../../styleVars';
import { DefinitionCard } from '../../atoms/DefinitionCard';
import { Button } from '../../ui/Button/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AddWordModalNavList } from '../../../types/navProps';
import { useConfirm } from '../../../hooks/useConfirm';
import { AddWordContext } from './AddWordModal';
import { ScreenLayout } from '../ScreenLayout';
import { Message } from '../../atoms/Message';

export function AddWordModalSection1({ }: {}) {
    const [searchTerm, setSearchTerm] = useState<string>('')
    //This is to avoid showing an empty screen when the user starts the search with the 
    //search results empty (dissapearing the starting message)
    const [isStartingSearch, setIsStartingSearch] = useState<boolean>(true)

    const { navigate } = useNavigation<NavigationProp<AddWordModalNavList>>()

    const { showConfirmationModal } = useConfirm()

    const { setForm } = useContext(AddWordContext)

    //Index of Word selected and the indexes of its definitions selected
    const [selectedDefinitions, setSelectedDefinitions] = useState<[number, number[]]>([-1, []])

    const onSelectDefinition = (wordIndex: number, definitionIndex: number) => {
        //If the definition is from the word already selected or no word is selected, add the definition
        if (selectedDefinitions[0] == -1 || selectedDefinitions[0] === wordIndex) {
            if (selectedDefinitions[1].includes(definitionIndex)) {
                //If the definition is selected, remove it
                setSelectedDefinitions([wordIndex, selectedDefinitions[1].filter(index => index !== definitionIndex)])
            } else {
                //If the definition is not selected, add it
                setSelectedDefinitions([wordIndex, [...selectedDefinitions[1], definitionIndex]])
            }
        } else {
            showConfirmationModal("If you select a definition from a different meaning, " +
                " your previous selections will be overwritten",
                () => setSelectedDefinitions([wordIndex, [definitionIndex]]))
        }
    }

    useEffect(() => {
        //If there are no definitions selected, remove the word selected
        if (selectedDefinitions[1].length === 0) setSelectedDefinitions([-1, []])
    }, [selectedDefinitions[1].length])


    const isDefinitionSelected = (wordIndex: number, definitionIndex: number) => {
        return selectedDefinitions[0] === wordIndex && selectedDefinitions[1].includes(definitionIndex)
    }


    const { search: searchWords } = useCrud<Word>('word')

    const { data: wordsPage, isFetching: isLoadingWordSearch, refetch: refetchWords } = useQuery<Page<Word>>({
        queryKey: ['searchWords', searchTerm],
        placeholderData: keepPreviousData,
        queryFn: async () => {
            return searchTerm ? searchWords(0, 0, { lang: 'en', term: searchTerm, count: false } as WordSearchForm)
                : { content: [], hasNext: false, pageNumber: 0, nElements: 0 } as Page<Word>
        },
        enabled: false
    })

    useEffect(() => {
        if (searchTerm === '') {
            setIsStartingSearch(true)
        } else {
            const timeout = setTimeout(() => {
                refetchWords()
                setSelectedDefinitions([-1, []])
                if (isStartingSearch) { setIsStartingSearch(false) }

            }, 500)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [searchTerm])


    const onNextScreen = () => {
        const form: CreateUserWordForm = { lang: 'en', term: '', definitions: [] }
        if (wordsPage !== undefined && selectedDefinitions[0] > -1) {
            form.term = wordsPage.content[selectedDefinitions[0]].term as string
            form.definitions = selectedDefinitions[1].map(index => wordsPage.content[selectedDefinitions[0]].definitions[index])
        }
        setForm(form)
        navigate("SaveWord")
    }

    return (
        <ScreenLayout isScrollable={false} buttons={
            <Button iconRight='arrow-right' onPress={() => onNextScreen()} >
                {'Next'}
            </Button>}
            contentContainerStyle={style.mainBox}
            containerStyle={{ paddingBottom: 16 }}
            isStickyButtons
        >
            <Input value={searchTerm} setValue={setSearchTerm} placeholder='Search word'
                placeholderIcon='search' isLoading={isLoadingWordSearch} />
            {searchTerm === '' || isStartingSearch ?
                <View style={{ marginTop: 24 }}>
                    <Message type='info' message={"You can search word definitions and adapt them on the next screen. "} />
                </View>
                :
                !isLoadingWordSearch && wordsPage?.content.length === 0 ?
                    <View style={{ marginTop: 24 }}>
                        <Message type='not-found' message={"We can't find your word. Click NEXT to create your own word."} />
                    </View> :
                    <ScrollView contentContainerStyle={style.wordsBox}>
                        {wordsPage?.content.map((word, wordIndex) =>
                            <View style={{ gap: 8 }} key={word.id}>
                                <View style={style.termBox}>
                                    <Typography style={{
                                        color: selectedDefinitions[0] === wordIndex ? colors.accent[600]
                                            : colors.primary[500]
                                    }} variant='h2'>{word.term}</Typography>
                                    <Typography style={{
                                        color: selectedDefinitions[0] === wordIndex ? colors.accent[600]
                                            : colors.primary[500], marginBottom: 10
                                    }} variant='body'>{wordIndex + 1}</Typography>
                                </View>
                                <View style={style.definitionsBox}>
                                    {word.definitions.map((definition, definitionIndex) =>
                                        <View key={definitionIndex}>
                                            <DefinitionCard definition={definition}
                                                isSelected={isDefinitionSelected(wordIndex, definitionIndex)}
                                                onSelect={() => onSelectDefinition(wordIndex, definitionIndex)} />
                                        </View>)}
                                </View>
                            </View>)}
                    </ScrollView>
            }
        </ScreenLayout >
    )
}

const style = StyleSheet.create({
    mainBox: {
        gap: 12,
    },
    wordsBox: {
        gap: 12,
    },
    termBox: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    definitionsBox: {
        gap: 12
    }
})