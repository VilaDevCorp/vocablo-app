import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenLayout } from './ScreenLayout';
import { Button } from '../ui/Button/Button';
import { Modal } from '../ui/Modal/Modal';
import { UserWordSearchForm } from '../../types/entities';
import { Tabs, TabValue } from '../ui/Tabs/Tabs';
import { Typography } from '../ui/Typography/Typography';


export const orderByValues: TabValue<string>[] = [
    { label: "Creation date", value: "creationDate" },
    { label: "Alphabetical", value: "term" },
    { label: "% Learned", value: "learningProgress" },
]

export const learnedValues: TabValue<boolean>[] = [
    { label: "All", value: undefined },
    { label: "Learned", value: true },
    { label: "Not learned", value: false },
]

export const orderDirectionValues: TabValue<string>[] = [
    { label: "ASC", value: "asc", icon: "arrow-up" },
    { label: "DESC", value: "desc", icon: "arrow-down" },
]


export function WordFiltersModal({ searchForm, setSearchForm, onClose }:
    { searchForm: UserWordSearchForm, setSearchForm: (form: UserWordSearchForm) => void, onClose: () => void }) {

    const [form, setForm] = useState<UserWordSearchForm>(searchForm)

    const onApplyFilters = () => {
        setSearchForm(form)
        onClose()
    }

    return (
        <Modal title={"Words filters"} onClose={onClose}>
            <ScreenLayout isStickyButtons containerStyle={{ paddingBottom: 16 }} contentContainerStyle={{ gap: 24 }} buttons={
                <Button iconRight={"check"} onPress={() => onApplyFilters()}>
                    {"Apply filters"}
                </Button>
            }>
                <View style={{ gap: 8 }}>
                    <Typography variant="label">{"Order by"}</Typography>
                    <Tabs<string> value={form.orderBy ?? "creationDate"} setValue={(val: string | undefined) => setForm({ ...form, orderBy: val })} tabs={orderByValues} />
                </View>
                <View style={{ gap: 8 }}>
                    <Typography variant="label">{"Order direction"}</Typography>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Tabs<string> value={form.orderDir ?? "desc"} setValue={(val: string | undefined) => setForm({ ...form, orderDir: val })} tabs={orderDirectionValues} />
                    </View>
                </View>
                <View style={{ gap: 8 }}>
                    <Typography variant="label">{"Progress"}</Typography>
                    <Tabs<boolean> value={form.learned} setValue={(val: boolean | undefined) => setForm({ ...form, learned: val })} tabs={learnedValues} />
                </View>
            </ScreenLayout >
        </Modal >
    )
}

const style = StyleSheet.create({

})