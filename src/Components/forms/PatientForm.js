import {Formik} from 'formik';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  caregiverOptions,
  caregiverTestOptions,
  categoryOptions,
  cupOptions,
  dmcOptions,
  genderOptions,
  morningSampleOptions,
  PatientFormSchema,
  relationOptions,
  sampleOptions,
  trackerOptions,
  trackerWeekOptions,
} from '../../Services/formData';
import {Colors} from '../../Theme';
import AppDatePicker from '../AppDatePicker';
import AppText from '../AppText';
import AppFormField from './AppFormField';
import AppRadioButton from './RadioButton';
import SubmitButton from './SubmitButton';

export default function PatientForm({onSubmit, initialValues}) {
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openT, setOpenT] = useState(false);

  return (
    <>
      <Formik
        initialValues={
          initialValues
            ? initialValues
            : {
                date: new Date(),
                name: '',
                age: '',
                category: '',
                sample_collected: '',
                sample_sent: '',
                cup_provided: '',
                morning_sample_sent: '',
                date_of_diagnosis: new Date(),
                date_of_treatment: new Date(),
                tracker_recieved: '',
                t_week1: '',
                t_week2: '',
                t_week3: '',
                t_week4: '',
                gender: '',
                phone: '',
                address: '',
                c_name: '',
                c_age: '',
                c_category: '',
                c_tested_negative: '',
                c_gender: '',
                c_phone: '',
              }
        }
        validationSchema={PatientFormSchema}
        onSubmit={onSubmit}>
        {({values, setFieldValue}) => (
          <>
            <AppText style={styles.text}>patient information</AppText>
            <AppDatePicker
              modal
              name="date"
              setOpen={setOpen}
              open={open}
              date={
                values.date instanceof Date ? values.date : values.date.toDate()
              }
              onConfirm={date => {
                setOpen(false);
                setFieldValue('date', date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
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
              <AppFormField
                name="phone"
                label="Phone Number"
                maxLength={10}
                keyboardType={'numeric'}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <AppRadioButton
                label={'TB Patient Category'}
                radio_props={categoryOptions}
                name="category"
              />
              {values.category === 0 && (
                <AppRadioButton
                  label={'Sample Collected'}
                  radio_props={sampleOptions}
                  name="sample_collected"
                />
              )}
              {values.category === 0 && values.sample_collected === 0 && (
                <AppRadioButton
                  label={'Sample Sent To DMC'}
                  radio_props={dmcOptions}
                  name="sample_sent"
                />
              )}
              {values.category === 0 &&
                values.sample_collected === 0 &&
                values.sample_sent === 0 && (
                  <AppRadioButton
                    label={'Suptum Cup Provided'}
                    radio_props={cupOptions}
                    name="cup_provided"
                  />
                )}
              {values.category === 0 &&
                values.sample_collected === 0 &&
                values.sample_sent === 0 &&
                values.cup_provided === 0 && (
                  <AppRadioButton
                    label={'Morning Sample Sent'}
                    radio_props={morningSampleOptions}
                    name="morning_sample_sent"
                  />
                )}

              {values.category === 1 && (
                <>
                  <AppDatePicker
                    modal
                    label="Date of Diagnosis"
                    name="date_of_diagnosis"
                    setOpen={setOpenD}
                    open={openD}
                    date={
                      values.date_of_diagnosis instanceof Date
                        ? values.date_of_diagnosis
                        : values.date_of_diagnosis.toDate()
                    }
                    onConfirm={date => {
                      setOpenD(false);
                      setFieldValue('date_of_diagnosis', date);
                    }}
                    onCancel={() => {
                      setOpenD(false);
                    }}
                  />
                  <AppDatePicker
                    modal
                    label="Date of Treatment"
                    name="date_of_treatment"
                    setOpen={setOpenT}
                    open={openT}
                    date={
                      values.date_of_treatment instanceof Date
                        ? values.date_of_treatment
                        : values.date_of_treatment.toDate()
                    }
                    onConfirm={date => {
                      setOpenT(false);
                      setFieldValue('date_of_treatment', date);
                    }}
                    onCancel={() => {
                      setOpenT(false);
                    }}
                  />
                  <AppRadioButton
                    label={'Progress Tracker Received'}
                    radio_props={trackerOptions}
                    name="tracker_recieved"
                  />
                  {values.tracker_recieved === 0 && (
                    <>
                      <AppRadioButton
                        label={'Week 1'}
                        radio_props={trackerWeekOptions}
                        name="t_week1"
                      />
                      <AppRadioButton
                        label={'Week 2'}
                        radio_props={trackerWeekOptions}
                        name="t_week2"
                      />
                      <AppRadioButton
                        label={'Week 3'}
                        radio_props={trackerWeekOptions}
                        name="t_week3"
                      />
                      <AppRadioButton
                        label={'Week 4'}
                        radio_props={trackerWeekOptions}
                        name="t_week4"
                      />
                    </>
                  )}
                </>
              )}

              <AppRadioButton
                label={'Gender'}
                radio_props={genderOptions}
                name="gender"
              />
              <AppFormField
                name="address"
                label="Address"
                placeholder="House Number,Street,Area"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <AppText style={styles.text}>Caregiver information</AppText>
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
                label={'TB Caregiver category'}
                radio_props={caregiverOptions}
                name="c_category"
              />

              <AppRadioButton
                label={'Gender'}
                radio_props={genderOptions}
                name="c_gender"
              />
              {/* <AppRadioButton
                label={'Relation to Patient'}
                radio_props={relationOptions}
                name="c_gender"
              /> */}
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
          </>
        )}
      </Formik>
    </>
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
