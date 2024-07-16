import React, {ReactNode} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {colors} from '../../../styleVars';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'button' | 'body' | 'hint';

const getFontSize = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h1':
      return 36;
    case 'h2':
      return 24;
    case 'h3':
      return 18;
    case 'button':
      return 16;
    default:
      return 14;
  }
};

const getFontFamily = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h1':
      return 'MerriweatherSans-Bold';
    case 'h2':
      return 'MerriweatherSans-Bold';
    default:
      return 'MerriweatherSans-Regular';
  }
};

const getColor = (variant: TypographyVariant) => {
  switch (variant) {
    case 'h2':
      return colors.primary[900];
    case 'hint':
      return colors.neutral[500];
    default:
      return colors.neutral[900];
  }
};

const getLineHeight = (variant: TypographyVariant) => {
  switch (variant) {
    case 'body':
      return 20;
    default:
      return undefined;
  }
};

export function Typography({
  variant = 'body',
  style,
  children,
}: {
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}) {
  return (
    <Text
      style={[
        {
          color: getColor(variant),
          fontFamily: getFontFamily(variant),
          fontSize: getFontSize(variant),
          lineHeight: getLineHeight(variant),
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
