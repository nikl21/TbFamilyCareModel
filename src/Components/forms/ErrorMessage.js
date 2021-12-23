import React from 'react';
import {StyleSheet} from 'react-native';
import AppText from '../AppText';

import {Colors} from '../../Theme';

export default function ErrorMessage({error, touched}) {
  if (!error || !touched) {
    return null;
  }
  return <AppText style={styles.errorText}>{error}</AppText>;
}
const styles = StyleSheet.create({
  errorText: {color: Colors.error, textTransform: 'capitalize'},
});
