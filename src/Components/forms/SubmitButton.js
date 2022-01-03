import {useFormikContext} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../Theme';

import AppButton from '../AppButton';

export default function SubmitButton({
  title = 'submit',
  bg,
  textColor,
  ...otherProps
}) {
  const {handleSubmit} = useFormikContext();
  return (
    <View style={(styles.container, {backgroundColor: bg})}>
      <AppButton
        title={title}
        onPress={handleSubmit}
        style={{color: textColor}}
        {...otherProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: '100%',
  },
});
