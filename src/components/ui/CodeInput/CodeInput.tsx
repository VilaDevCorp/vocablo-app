import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {colors} from '../../../styleVars';
import {Typography} from '../Typography/Typography';

type CodeInputProps = TextInputProps & {
  code: string;
  setCode: (code: string) => void;
  charNumber: number;
};

const numbers = Array.from({length: 10}).map((_, i) => i.toString());

export function CodeInput(props: CodeInputProps) {
  const [focusedInput, setFocusedInput] = useState<undefined | number>(
    undefined,
  );

  const textInputRefs = useRef<TextInput[]>([]);
  const {code, setCode, charNumber, ...nativeInputProps} = props;

  useEffect(() => {
    if (focusedInput !== undefined) {
      textInputRefs.current[focusedInput].focus();
    }
  }, [focusedInput]);

  const setFormattedCode = (value: string, index: number) => {
    const charToInsert = numbers.includes(value) ? value : '-';
    const newCode = [...code];
    newCode[index] = charToInsert;
    setCode(newCode.join(''));
    if (
      focusedInput !== undefined &&
      focusedInput < charNumber - 1 &&
      value !== ''
    ) {
      setFocusedInput(focusedInput + 1);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.codeInputsContainer}>
        {Array.from({length: charNumber}).map((_, index) => (
          <View
            key={index}
            style={[
              style.inputBox,
              focusedInput === index && style.inputBoxFocus,
            ]}>
            <TextInput
              inputMode="numeric"
              maxLength={1}
              ref={node => {
                if (node) {
                  textInputRefs.current[index] = node;
                }
              }}
              value={code[index]}
              onFocus={e => {
                setFocusedInput(index);
                nativeInputProps.onFocus && nativeInputProps.onFocus(e);
              }}
              onBlur={e => {
                setFocusedInput(undefined);
                nativeInputProps.onBlur && nativeInputProps.onBlur(e);
              }}
              onKeyPress={e => {
                e.preventDefault();
                setFormattedCode(e.nativeEvent.key, index);
              }}
              style={[
                style.input,
                focusedInput === index && {color: colors.neutral[900]},
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {gap: 8},
  codeInputsContainer: {
    gap: 4,
    flexDirection: 'row',
    width: '100%',
  },
  inputBox: {
    borderWidth: 2,
    minHeight: 50,
    height: 50,
    borderColor: colors.primary[500],
    flexDirection: 'row',
    flex: 1,
    width: 50,
    minWidth: 50,
    borderRadius: 12,
    backgroundColor: colors.neutral[200],
    color: colors.neutral[600],
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    fontFamily: 'MerriweatherSans-Regular',
  },
  errorMsg: {
    color: colors.error[700],
  },
});
