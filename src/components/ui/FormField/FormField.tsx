import {cloneElement, ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../styleVars';
import {Typography} from '../Typography/Typography';

export function FormField({
  input,
  errorMsg,
}: {
  input: ReactElement;
  errorMsg?: string;
}) {
  return (
    <View style={style.container}>
      {cloneElement(input, {
        hasError: errorMsg !== '' && errorMsg !== undefined,
      })}
      <Typography style={style.errorMsg}>{errorMsg}</Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  errorMsg: {
    color: colors.error[700],
  },
});
