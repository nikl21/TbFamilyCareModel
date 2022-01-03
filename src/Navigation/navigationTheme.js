import {DefaultTheme} from '@react-navigation/native';
import {Colors} from '../Theme';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.appColor,
    background: Colors.white,
  },
};
