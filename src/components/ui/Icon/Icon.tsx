import React from 'react';
import { colors } from '../../../styleVars';
import Add from './icons/add.svg';
import Check from './icons/check.svg';
import User from './icons/user.svg';
import Lock from './icons/lock.svg';
import Mail from './icons/mail.svg';
import ArrowLeft from './icons/arrow-left.svg';
import Info from './icons/info.svg';
import Repeat from './icons/repeat.svg';
import Alert from './icons/alert.svg';
import Close from './icons/close.svg';
import Search from './icons/search.svg';
import ArrowRight from './icons/arrow-right.svg';
import Trash from './icons/trash.svg';
import Home from './icons/home.svg';
import Word from './icons/word.svg';
import CircleCheck from './icons/circle-check.svg';
import SearchX from './icons/search-x.svg';
import { ColorValue } from 'react-native';

export type IconProps = {
  type: SystemIcons;
  size?: number;
  color?: ColorValue;
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
  | 'alert'
  | 'close'
  | 'search'
  | 'arrow-right'
  | 'trash'
  | 'home'
  | 'word'
  | 'circle-check'
  | 'search-x';

export const Icon = (props: IconProps) => {
  const { type, size = 16, color = colors.primary[500] } = props;
  return getIconType(type, size, color);
};

function getIconType(
  type: SystemIcons,
  size = 12,
  color?: ColorValue,
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
    case 'close':
      return <Close width={size} height={size} color={color} />;
    case 'search':
      return <Search width={size} height={size} color={color} />;
    case 'arrow-right':
      return <ArrowRight width={size} height={size} color={color} />;
    case 'trash':
      return <Trash width={size} height={size} color={color} />;
    case 'home':
      return <Home width={size} height={size} color={color} />;
    case 'word':
      return <Word width={size} height={size} color={color} />;
    case 'circle-check':
      return <CircleCheck width={size} height={size} color={color} />;
    case 'search-x':
      return <SearchX width={size} height={size} color={color} />;
    default:
      return <></>;
  }
}
