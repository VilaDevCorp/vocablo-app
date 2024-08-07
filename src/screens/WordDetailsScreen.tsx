import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { MyWordsStackNavList } from '../types/navProps';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCrud } from '../hooks/useCrud';
import { UserWord } from '../types/entities';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Typography } from '../components/ui/Typography/Typography';
import { Button } from '../components/ui/Button/Button';
import { colors } from '../styleVars';
import { useConfirm } from '../hooks/useConfirm';
import { Icon } from '../components/ui/Icon/Icon';
import { EditWordModal } from '../components/organisms/EditWordModal';
import { ScreenLayout } from '../components/organisms/ScreenLayout';

export function WordDetailsScreen({ }: {}) {

    const { params } = useRoute<RouteProp<MyWordsStackNavList>>();
    const userWordId = params?.userWordId;
    const { goBack } = useNavigation()

    const { get: getUserWord, remove: removeUserWord } = useCrud<UserWord>("userword");

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false)

    const { setOptions } = useNavigation<NavigationProp<MyWordsStackNavList>>();

    const { data: userWord, isLoading } = useQuery({
        queryKey: ['userwordDetails', userWordId],
        queryFn: () => {
            return getUserWord(userWordId!);
        },

        enabled: !!userWordId,
    })


    const queryClient = useQueryClient()

    const { mutate: deleteUserWord, isPending: isDeletingUserWord } =
        useMutation({
            mutationFn: (id: string) => removeUserWord(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['myuserwords'] })
                goBack()
            }
        })

    const { showConfirmationModal } = useConfirm()

    useEffect(() => {
        setOptions({
            title: userWord?.term
        })
    }, [userWord])

    const disabledButtons = isDeletingUserWord || isLoading


    return (
        userWord && <>
            <ScreenLayout isScrollable={true} isStickyButtons containerStyle={style.mainBox}
                buttons={
                    <>
                        <Button onPress={() => { setEditModalVisible(true) }} variant='solid'>
                            Edit
                        </Button>
                        <Button onPress={() => {
                            showConfirmationModal("Do you really want to delete this word?",
                                () => deleteUserWord(userWord.id),
                                <Icon type='alert' color={colors.error[500]} size={64} />)
                        }} disabled={disabledButtons} variant='ghost' fontColor={colors.error[500]}>
                            Delete
                        </Button>
                    </>
                }>
                {userWord?.definitions && userWord?.definitions.map((def, index) => (
                    <View key={index}>
                        <View style={style.definitionAndNumber}>
                            <Typography style={{}} variant='definitionIndex'>{index + 1}</Typography>
                            <Typography key={index} style={{ flexWrap: 'wrap', flexShrink: 1, flexGrow: 1, flexBasis: 0 }} variant='body'>{def.definition}</Typography>
                        </View>
                        {/*//Margin= the width of the index number plus the gap*/}
                        <Typography style={{ marginLeft: 36 }} variant='example'>{def.example}</Typography>
                    </View>
                ))}
            </ScreenLayout>


            {editModalVisible && <EditWordModal word={userWord} onClose={() => setEditModalVisible(false)} />}
        </>
    )
}

const style = StyleSheet.create({
    mainBox: {
        gap: 16
    },
    definitionAndNumber: {
        flexDirection: 'row',
        gap: 8,
    }
})