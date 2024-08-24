import React, {useState} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {LoadingIcon} from '../Icon/icons/LoadingIcon';
import {colors} from '../../../styleVars';
import {Icon, SystemIcons} from '../Icon/Icon';

export type ButtonVariant = 'solid' | 'outlined' | 'ghost';

type IconButtonProps = {
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  icon: SystemIcons;
  fontColor?: string;
  iconSize?: number;
};

export function IconButton(props: IconButtonProps) {
  const {
    onPress,
    variant = 'solid',
    disabled = false,
    isLoading = false,
    icon,
    fontColor,
    iconSize,
  } = props;

  const [pressed, setPressed] = useState(false);

  const getBgColor = () => {
    switch (variant) {
      case 'solid':
        return pressed ? colors.primary[700] : colors.primary[500];
      case 'outlined':
        return pressed ? colors.neutral[100] : 'transparent';
      case 'ghost':
        return pressed ? 'transparent' : 'transparent';
    }
  };

  const getFontColor = () => {
    if (fontColor) {
      return fontColor;
    }
    switch (variant) {
      case 'solid':
        return colors.neutral[100];
      case 'outlined':
        return colors.primary[500];
      case 'ghost':
        return pressed ? colors.accent[300] : colors.primary[500];
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'solid':
        return pressed ? colors.accent[300] : colors.primary[500];
      case 'outlined':
        return pressed ? colors.accent[300] : colors.primary[500];
      case 'ghost':
        return 'transparent';
    }
  };

  const styles = StyleSheet.create({
    box: {
      borderRadius: 12,
      minHeight: 50,
      minWidth: 50,
      height: 50,
      width: 50,
      backgroundColor: getBgColor(),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: getBorderColor(),
      opacity: disabled ? 0.4 : 1,
    },
    text: {
      textAlign: 'center',
      color: getFontColor(),
      fontSize: 24,
    },
  });

  return (
    <Pressable
      style={styles.box}
      onPressIn={() => !disabled && setPressed(true)}
      onPressOut={() => !disabled && setPressed(false)}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <LoadingIcon size={iconSize ? iconSize : 24} color={getFontColor()} />
      ) : (
        <Icon
          size={iconSize ? iconSize : 24}
          type={icon}
          color={getFontColor()}
        />
      )}
    </Pressable>
  );
}
