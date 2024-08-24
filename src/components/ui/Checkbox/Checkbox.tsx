import React, {Dispatch, ReactNode, SetStateAction, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '../Icon/Icon';
import {colors} from '../../../styleVars';
import {Typography} from '../Typography/Typography';

export function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={style.mainBox}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onChange(checked => !checked)}>
      <View style={[style.checkbox, pressed && style.pressed]}>
        {checked && <Icon type="check" size={24} color={colors.accent[300]} />}
      </View>
      <Typography>{children}</Typography>
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  checkbox: {
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 6,
    borderColor: colors.primary[500],
    backgroundColor: 'transparent',
  },
  pressed: {borderColor: colors.accent[300]},
});
