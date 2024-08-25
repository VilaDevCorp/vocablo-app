import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../../Typography/Typography';

export function Header({ title }: { title: string }) {
  return (
    <View style={style.container}>
      <Typography variant="h2">
        {title}
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    marginBottom: 16,
  },
});
