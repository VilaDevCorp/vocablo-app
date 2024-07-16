import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../styleVars';
import {IconButton} from '../IconButton';
import {Typography} from '../../Typography/Typography';

export function Header(props: NativeStackHeaderProps) {
  return (
    <View style={style.container}>
      <IconButton
        icon="arrow-left"
        onPress={() => props.navigation.goBack()}
        variant="ghost"
      />
      <Typography variant="h2">
        {props.options.title}
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    padding:0,
    margin:0, 
    alignItems: 'center',
    marginBottom: 16,
  },
});
