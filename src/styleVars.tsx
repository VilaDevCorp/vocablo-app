import { ColorValue } from "react-native";

interface ColorPalette {
  100: ColorValue;
  200: ColorValue;
  300: ColorValue;
  400: ColorValue;
  500: ColorValue;
  600: ColorValue;
  700: ColorValue;
  800: ColorValue;
  900: ColorValue;
}

export interface SystemColors {
  primary: ColorPalette;
  accent: ColorPalette;
  error: ColorPalette;
  neutral: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
}

export const colors: SystemColors = {
  primary: {
    100: '#99CCFF',
    200: '#70ACFF',
    300: '#5797FF',
    400: '#427EFF',
    500: '#3A71FF',
    600: '#2E69FF',
    700: '#245EFF',
    800: '#0F4FFF',
    900: '#002DB3',
  },
  accent: {
    100: '#ff8fae',
    200: '#fb699a',
    300: '#f65595',
    400: '#f1418a',
    500: '#ef3481',
    600: '#e72274',
    700: '#d81861',
    800: '#c60f55',
    900: '#aa0343',
  },
  neutral: {
    100: '#FDFCFC',
    200: '#F9F7F6',
    300: '#F0EEEA',
    400: '#C3BFB6',
    500: '#9E9A94',
    600: '#868179',
    700: '#6C6860',
    800: '#2A2722',
    900: '#12100C',
  },
  error: {
    100: '#FA726B',
    200: '#DF2D20',
    300: '#D32717',
    400: '#BC2110',
    500: '#a91b0b',
    600: '#951709',
    700: '#841306',
    800: '#770F04',
    900: '#6E0D02',
  },
  success: {
    100: '#99ffad',
    200: '#3DF556',
    300: '#3AE951',
    400: '#26D938',
    500: '#13B41E',
    600: '#0DA518',
    700: '#089608',
    800: '#077C03',
    900: '#097000',
  },
  warning: {
    100: '#ffe066',
    200: '#fddd5d',
    300: '#facd38',
    400: '#f6c02c',
    500: '#f1b40e',
    600: '#eaab0b',
    700: '#e2a508',
    800: '#d09006',
    900: '#b37c05',
  }
};
