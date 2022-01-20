import {Formik, Form, Field, useFormikContext} from 'formik';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppDatePicker from '../AppDatePicker';
import AppText from '../AppText';
import AppFormField from './AppFormField';
import FormInput from './FormInput';

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
      <FormInput
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
