import React from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {View, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';
import {Colors} from '../../Theme';
import AppText from '../AppText';

export default function AppRadioButton({
  name,
  label,
  isHorizontal = true,
  radio_props,
}) {
  const {setFieldValue, values} = useFormikContext();
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <RadioForm formHorizontal={isHorizontal} animation={true}>
        {/* To create radio buttons, loop through your array of options */}
        {radio_props.map((obj, i) => (
          <RadioButton
            labelHorizontal={true}
            key={i}
            wrapStyle={styles.radioButton}
            selectedButtonColor={Colors.white}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={values[name] === i}
              onPress={value => {
                setFieldValue(name, value);
              }}
              borderWidth={1}
              buttonSize={10}
              buttonColor={Colors.gray}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={() => {}}
              labelStyle={styles.labelStyle}
              labelWrapStyle={styles.labelWrapStyle}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    color: Colors.text,
    fontFamily: 'Assistant-Regular',
    // textTransform: 'capitalize',
  },
  labelStyle: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: 'Assistant-Regular',
    textTransform: 'capitalize',
  },
  radioButton: {
    flex: 1,
  },
  labelWrapStyle: {},
});
