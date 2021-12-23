import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {AppForm, AppFormField, AppText, SubmitButton} from '../Components';
import AppDatePicker from '../Components/AppDatePicker';
import AppRadioButton from '../Components/forms/RadioButton';
import {
  caregiverOptions,
  categoryOptions,
  genderOptions,
  PatientFormSchema,
} from '../Services/formData';
import {Colors} from '../Theme';

export default function AddPatientScreen() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <AppText style={styles.text}>patient information</AppText>
        <AppDatePicker
          modal
          setOpen={setOpen}
          setDate={setDate}
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <AppForm
          initialValues={{
            date: date,
            name: '',
            age: '',
            category: '',
            gender: '',
            phone: '',
            address: '',
            c_name: '',
            c_age: '',
            c_category: '',
            c_gender: '',
            c_phone: '',
          }}
          validationSchema={PatientFormSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          <View style={styles.inputContainer}>
            <AppFormField
              name="name"
              label="Patient Name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="age"
              label="age"
              maxLength={2}
              keyboardType={'numeric'}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppRadioButton
              label={'category'}
              radio_props={categoryOptions}
              name="category"
            />
            <AppRadioButton
              label={'gender'}
              radio_props={genderOptions}
              name="gender"
            />
            <AppFormField
              name="address"
              label="address"
              placeholder="House Number,Street,Area"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <AppText style={styles.text}>CareGiver information</AppText>
          <View style={styles.inputContainer}>
            <AppFormField
              name="c_name"
              label="Caregiver Name"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="c_age"
              label="age"
              maxLength={2}
              keyboardType={'numeric'}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppRadioButton
              label={'category'}
              radio_props={caregiverOptions}
              name="c_category"
            />
            <AppRadioButton
              label={'gender'}
              radio_props={genderOptions}
              name="c_gender"
            />
            <AppFormField
              name="c_phone"
              label="Phone Number"
              maxLength={10}
              keyboardType={'numeric'}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <SubmitButton bg={Colors.appColor} textColor={Colors.white} />
        </AppForm>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 30,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Assistant-SemiBold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderColor: Colors.containerBorder,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 80,
  },
  inputContainer: {
    marginBottom: 30,
  },
});
