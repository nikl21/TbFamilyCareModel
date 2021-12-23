import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors, WP} from '../Theme';

function AppText({children, style}) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}
const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontFamily: 'Assistant-Regular',
    fontSize: 18,
  },
});

export default AppText;
