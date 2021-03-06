import {Formik, Form, Field, useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  actionOptions,
  drugReactionOptions,
  medicationOptions,
} from '../../Services/formData';
import AppDatePicker from '../AppDatePicker';
import AppText from '../AppText';
import AppFormField from './AppFormField';
import FormInput from './FormInput';
import AppRadioButton from './RadioButton';

export default function NewSessionForm({session_number, index}) {
  const {setFieldTouched, setFieldValue, handleChange, values} =
    useFormikContext();
  const [openT, setOpenT] = useState(false);
  return (
    <View style={styles.container}>
      <AppText style={styles.heading}>Session {session_number}</AppText>
      <AppDatePicker
        modal
        label="Session Date"
        setOpen={setOpenT}
        open={openT}
        date={
          values.new_sessions[index].date_of_visit instanceof Date
            ? values.new_sessions[index].date_of_visit
            : values.new_sessions[index].date_of_visit.toDate()
        }
        onConfirm={date => {
          setOpenT(false);
          const sessions = values.new_sessions;
          sessions[index].date_of_visit = date;
          setFieldValue('new_sessions', sessions);
        }}
        onCancel={() => {
          setOpenT(false);
        }}
      />
      <AppRadioButton
        label={
          'Is the patient experiencing any adverse drug reactions/side effects?'
        }
        radio_props={drugReactionOptions}
        index={index}
        isNewSession={true}
        name={'drugReaction'}
      />
      {values.new_sessions[index].drugReaction === 0 && (
        <AppRadioButton
          isHorizontal={false}
          label={'What action did you take?'}
          radio_props={actionOptions}
          index={index}
          isNewSession={true}
          name={'action'}
        />
      )}
      {values.new_sessions[index].drugReaction === 0 &&
        values.new_sessions[index].action === 2 && (
          <FormInput
            placeholder=""
            multiline={true}
            labelStyle={{textTransform: 'none'}}
            onChangeText={handleChange(`new_sessions.${index}.other`)}
            value={values.new_sessions[index].other}
            label="Other action"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={() => {
              setFieldTouched(`new_sessions.${index}.other`);
            }}
          />
        )}
      <AppRadioButton
        label={'Is the patient taking their medication as prescribed?'}
        radio_props={medicationOptions}
        isNewSession={true}
        index={index}
        name={'medication'}
      />
      {values.new_sessions[index].medication === 1 && (
        <FormInput
          placeholder=""
          multiline={true}
          labelStyle={{textTransform: 'none'}}
          onChangeText={handleChange(`new_sessions.${index}.notes`)}
          value={values.new_sessions[index].notes}
          label="Reason why the patient is not taking their medication"
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => {
            setFieldTouched(`new_sessions.${index}.notes`);
          }}
        />
      )}
      <FormInput
        placeholder=""
        multiline={true}
        labelStyle={{textTransform: 'none'}}
        onChangeText={handleChange(`new_sessions.${index}.notes`)}
        value={values.new_sessions[index].notes}
        label="Notes"
        autoCapitalize="none"
        autoCorrect={false}
        onBlur={() => {
          setFieldTouched(`new_sessions.${index}.notes`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  heading: {
    textTransform: 'uppercase',
    fontFamily: 'Assistant-SemiBold',
    fontSize: 24,
    marginBottom: 20,
  },
});
