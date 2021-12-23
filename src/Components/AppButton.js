import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, WP} from '../Theme';
import AppText from './AppText';

export default function AppButton({text, onPress, style, bg}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bg}]}
      onPress={onPress}>
      <AppText style={[styles.text, style]}>{text}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  text: {color: Colors.appColor, fontFamily: 'Assistant-SemiBold'},
});
