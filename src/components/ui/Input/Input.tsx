import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {Icon, SystemIcons} from '../Icon/Icon';
import {colors} from '../../../styleVars';
import {Typography} from '../Typography/Typography';

type InputProps = TextInputProps & {
  setValue: (value: string) => void;
  type?: 'text' | 'password';
  icon?: SystemIcons;
  disabled?: boolean;
  hasError?: boolean;
};

export const Input = (props: InputProps) => {
  const {
    type = 'text',
    setValue,
    disabled,
    icon,
    hasError,
    ...nativeInputProps
  } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={style.inputAndErrorBox}>
      <View
        style={[
          style.inputBox,
          isFocus && !disabled && style.inputBoxFocus,
          hasError && style.inputBoxError,
          disabled && style.inputBoxDisabled,
        ]}>
        {icon && <Icon type={icon} color={colors.neutral[400]} size={24} />}
        <TextInput
          {...nativeInputProps}
          onFocus={e => {
            if (disabled) return;
            setIsFocus(true);
            nativeInputProps.onFocus && nativeInputProps.onFocus(e);
          }}
          onBlur={e => {
            setIsFocus(false);
            nativeInputProps.onBlur && nativeInputProps.onBlur(e);
          }}
          onChangeText={e => setValue(e)}
          style={[
            style.input,
            isFocus && !disabled && {color: colors.neutral[900]},
            disabled && {color: colors.neutral[600]},
          ]}
          secureTextEntry={type === 'password'}
          placeholderTextColor={colors.neutral[400]}
          editable={!disabled}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputAndErrorBox: {
    gap: 4,
  },
  inputBox: {
    borderWidth: 2,
    minHeight: 50,
    height: 50,
    borderColor: colors.primary[500],
    paddingHorizontal: 24,
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: colors.neutral[200],
    color: colors.neutral[600],
    gap: 8,
    alignItems: 'center',
  },
  inputBoxFocus: {
    borderColor: colors.accent[600],
  },
  inputBoxDisabled: {
    opacity: 0.4,
    backgroundColor: colors.neutral[300],
  },
  inputBoxError: {
    borderWidth: 3,
    borderColor: colors.error[500],
  },
  input: {
    color: colors.neutral[700],
    fontSize: 16,
    flex: 1,
    height: 50,
    fontFamily: 'MerriweatherSans-Regular',
  },
});
