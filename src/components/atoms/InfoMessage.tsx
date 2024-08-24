import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Icon} from '../ui/Icon/Icon';
import {Typography} from '../ui/Typography/Typography';
import {colors} from '../../styleVars';

export function InfoMessage({
  children,
  style,
}: {
  children: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[{flexDirection: 'row', gap: 8, alignItems: 'center'}, style]}>
      <View style={{alignSelf: 'flex-start'}}>
        <Icon type="info" size={20} color={colors.accent[300]} />
      </View>
      <Typography style={{flex: 1}}>{children}</Typography>
    </View>
  );
}
