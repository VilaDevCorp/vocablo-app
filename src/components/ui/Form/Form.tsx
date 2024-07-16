import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export function Form({
  fields,
  buttons,
}: {
  fields: React.ReactNode;
  buttons?: React.ReactNode;
}) {
  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={style.mainBox}>
      <View style={style.fieldsScrollView}>{fields}</View>
      {buttons && <View style={style.buttonsBox}>{buttons}</View>}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  mainBox: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
  fieldsScrollView: {
    flexDirection: 'column',
    gap: 8,
  },
  buttonsBox: {
    flexDirection: 'column',
    gap: 16,
  },
});
