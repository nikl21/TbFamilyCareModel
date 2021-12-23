import {useFormikContext} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import AppButton from '../AppButton';

export default function SubmitButton({
  title = 'submit',
  textColor,
  ...otherProps
}) {
  const {handleSubmit} = useFormikContext();
  return (
    <View style={styles.container}>
      <AppButton
        text={title}
        onPress={handleSubmit}
        style={[styles.textStyle, {color: textColor}]}
        {...otherProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  textStyle: {
    fontFamily: 'Assistant-SemiBold',
    textTransform: 'uppercase',
  },
});
