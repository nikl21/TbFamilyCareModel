import {useFormikContext} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../Theme';
import i18n from '../../Translations';

import AppButton from '../AppButton';

export default function SubmitButton({
  title = i18n.t('addPatient.submit'),
  bg,
  textColor,
  ...otherProps
}) {
  const {handleSubmit} = useFormikContext();
  return (
    <View style={styles.container}>
      <AppButton
        title={title}
        onPress={handleSubmit}
        style={{color: textColor}}
        {...otherProps}
        bg={bg}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
