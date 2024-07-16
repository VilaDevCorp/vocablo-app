import React from 'react';
import {colors} from '../../../styleVars';
import Add from './icons/add.svg';
import Check from './icons/check.svg';
import User from './icons/user.svg';
import Lock from './icons/lock.svg';
import Mail from './icons/mail.svg';
import ArrowLeft from './icons/arrow-left.svg';
import Info from './icons/info.svg';
import Repeat from './icons/repeat.svg';
import Alert from './icons/alert.svg';

export type IconProps = {
  type: SystemIcons;
  size?: number;
  color?: string;
};

export type SystemIcons =
  | 'add'
  | 'check'
  | 'user'
  | 'lock'
  | 'mail'
  | 'arrow-left'
  | 'info'
  | 'repeat'
  | 'alert';

export const Icon = (props: IconProps) => {
  const {type, size = 16, color = colors.primary[500]} = props;
  return getIconType(type, size, color);
};

function getIconType(
  type: SystemIcons,
  size = 12,
  color?: string,
): React.ReactElement {
  switch (type) {
    case 'add':
      return <Add width={size} height={size} color={color} />;
    case 'check':
      return <Check width={size} height={size} color={color} />;
    case 'user':
      return <User width={size} height={size} color={color} />;
    case 'lock':
      return <Lock width={size} height={size} color={color} />;
    case 'mail':
      return <Mail width={size} height={size} color={color} />;
    case 'arrow-left':
      return <ArrowLeft width={size} height={size} color={color} />;
    case 'info':
      return <Info width={size} height={size} color={color} />;
    case 'repeat':
      return <Repeat width={size} height={size} color={color} />;
    case 'alert':
      return <Alert width={size} height={size} color={color} />;
    default:
      return <></>;
  }
}
