import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';

import {
  caregiverOptions,
  categoryOptions,
  cupOptions,
  dmcOptions,
  genderOptions,
  morningSampleOptions,
  npyOptions,
  PatientFormSchema,
  patientTypeOptions,
  relationOptions,
  sampleOptions,
  testOptions,
  trackerOptions,
  trackerWeekOptions,
} from '../../Services/formData';
import {Colors} from '../../Theme';
import AppButton from '../AppButton';
import AppDatePicker from '../AppDatePicker';
import AppText from '../AppText';
import AppFormField from './AppFormField';
import NewSessionForm from './NewSessionForm';
import AppRadioButton from './RadioButton';
import SubmitButton from './SubmitButton';

export default function PatientForm({onSubmit, initialValues}) {
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [openSD, setOpenSD] = useState(false);
  const [openTR, setOpenTR] = useState(false);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getUsername = async () => {
      try {
        await AsyncStorage.getItem('username').then(value => {
          if (isMounted) {
            setUsername(value);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    };
    getUsername();
    return () => {
      isMounted = false;
    };
  }, []);

  function addNewSession(values, setFieldValue) {
    const sessionArray = values.new_sessions || [];
    sessionArray.push({
      session_number: sessionArray.length + 2,
      date_of_visit: new Date(),
      notes: '',
      drugReaction: '',
      action: '',
      medication: '',
      other: '',
    });
    setFieldValue('new_sessions', sessionArray);
  }

  function setDynamicValues(values, setFieldValue) {
    if (
      values.category === 1 &&
      (values.sample_test_result === 1 || values.sample_test_result === 0)
    ) {
      setFieldValue('sample_test_result', '');
    } else if (
      values.category === 0 &&
      values.morning_sample_sent === 1 &&
      (values.sample_test_result === 1 || values.sample_test_result === 0)
    ) {
      setFieldValue('sample_test_result', '');
    }
  }

  return (
    <View>
      {username && (
        <Formik
          initialValues={
            initialValues
              ? initialValues
              : {
                  date: new Date(),
                  name: '',
                  age: '',
                  category: '',
                  patient_type: '',
                  sample_collected: '',
                  sample_sent: '',
                  sample_send_date: new Date(),
                  cup_provided: '',
                  morning_sample_sent: '',
                  sample_test_result: '',
                  date_of_test_result: new Date(),
                  date_of_diagnosis: new Date(),
                  date_of_treatment: new Date(),
                  npy_availed: '',
                  completed_diagnosis: '',
                  tracker_recieved: '',
                  t_week1: '',
                  t_week2: '',
                  t_week3: '',
                  t_week4: '',
                  gender: '',
                  phone: '',
                  second_phone: '',
                  third_phone: '',
                  address: '',
                  c_name: '',
                  c_age: '',
                  c_category: '',
                  c_tested_negative: '',
                  c_gender: '',
                  c_relation: '',
                  c_phone: '',
                  c_second_phone: '',
                  new_sessions: [],
                  user: username,
                }
          }
          validationSchema={PatientFormSchema}
          onSubmit={onSubmit}>
          {({values, setFieldValue, isSubmitting}) => (
            <>
              <AppText style={styles.text}>patient information</AppText>
              <AppDatePicker
                modal
                setOpen={setOpen}
                open={open}
                date={
                  values.date instanceof Date
                    ? values.date
                    : values.date.toDate()
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
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="phone"
                  label="Phone Number"
                  placeholder="9876543210"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="second_phone"
                  label="Second Phone Number"
                  placeholder="9876543210"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="third_phone"
                  label="Third Phone Number"
                  placeholder="9876543210"
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
                {setDynamicValues(values, setFieldValue)}
                {values.category === 0 && (
                  <AppRadioButton
                    label={'Sample Collected'}
                    radio_props={sampleOptions}
                    name="sample_collected"
                  />
                )}
                {values.category === 0 && values.sample_collected === 0 && (
                  <AppRadioButton
                    label={'Sample Sent To DMC/TDC'}
                    radio_props={dmcOptions}
                    name="sample_sent"
                  />
                )}

                {values.category === 0 &&
                  values.sample_collected === 0 &&
                  values.sample_sent === 0 && (
                    <AppDatePicker
                      modal
                      label="Sample Sent Date"
                      name="sample_send_date"
                      setOpen={setOpenSD}
                      open={openSD}
                      date={
                        values.sample_send_date instanceof Date
                          ? values.sample_send_date
                          : values.sample_send_date.toDate()
                      }
                      onConfirm={date => {
                        setOpenSD(false);
                        setFieldValue('sample_send_date', date);
                      }}
                      onCancel={() => {
                        setOpenSD(false);
                      }}
                    />
                  )}
                {values.category === 0 &&
                  values.sample_collected === 0 &&
                  values.sample_sent === 0 && (
                    <AppRadioButton
                      label={'Sputum Cup Provided'}
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
                {values.category === 0 &&
                  values.sample_collected === 0 &&
                  values.sample_sent === 0 &&
                  values.cup_provided === 0 &&
                  values.morning_sample_sent === 0 && (
                    <AppRadioButton
                      label={'Test Results'}
                      radio_props={testOptions}
                      name="sample_test_result"
                    />
                  )}
                {values.category === 0 &&
                  values.sample_collected === 0 &&
                  values.sample_sent === 0 &&
                  values.cup_provided === 0 &&
                  values.morning_sample_sent === 0 &&
                  values.sample_test_result !== '' && (
                    <AppDatePicker
                      modal
                      label="Date of test Result"
                      name="date_of_test_result"
                      setOpen={setOpenTR}
                      open={openTR}
                      date={
                        values.date_of_test_result instanceof Date
                          ? values.date_of_test_result
                          : values.date_of_test_result.toDate()
                      }
                      onConfirm={date => {
                        setOpenTR(false);
                        setFieldValue('date_of_test_result', date);
                      }}
                      onCancel={() => {
                        setOpenTR(false);
                      }}
                    />
                  )}
                {values.category === 1 && (
                  <>
                    <AppRadioButton
                      labelStyle={{textTransform: 'none'}}
                      label={'Type of Patient'}
                      radio_props={patientTypeOptions}
                      name="patient_type"
                    />
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
                      label="Date of Treatment Initiation"
                      setOpen={setOpenT}
                      open={openT}
                      minimumDate={
                        values.date_of_diagnosis
                          ? values.date_of_diagnosis instanceof Date
                            ? values.date_of_diagnosis
                            : values.date_of_diagnosis.toDate()
                          : null
                      }
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
                          label={'Filled in Week 1'}
                          radio_props={trackerWeekOptions}
                          name="t_week1"
                        />
                        <AppRadioButton
                          label={'Filled in Week 2'}
                          radio_props={trackerWeekOptions}
                          name="t_week2"
                        />
                        <AppRadioButton
                          label={'Filled in Week 3'}
                          radio_props={trackerWeekOptions}
                          name="t_week3"
                        />
                        <AppRadioButton
                          label={'Filled in Week 4'}
                          radio_props={trackerWeekOptions}
                          name="t_week4"
                        />
                      </>
                    )}
                  </>
                )}
                <AppRadioButton
                  label={'Gender'}
                  isHorizontal={false}
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
                {(values.category === 1 || values.sample_test_result === 0) && (
                  <>
                    <AppRadioButton
                      label={'Availed Nikshay Poshan Yojana ?'}
                      radio_props={npyOptions}
                      name="npy_availed"
                    />
                    <AppRadioButton
                      label={'Has the patient completed their treatment ?'}
                      radio_props={npyOptions}
                      name="completed_diagnosis"
                    />
                  </>
                )}
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
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="c_phone"
                  placeholder="9876543210"
                  label="Phone Number"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="c_second_phone"
                  placeholder="9876543210"
                  label="Second Phone Number"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppRadioButton
                  isHorizontal={false}
                  label={'TB Caregiver category'}
                  radio_props={caregiverOptions}
                  name="c_category"
                />

                <AppRadioButton
                  label={'Gender'}
                  isHorizontal={false}
                  radio_props={genderOptions}
                  name="c_gender"
                />

                <AppRadioButton
                  isHorizontal={false}
                  label={'Relation to Patient'}
                  radio_props={relationOptions}
                  name="c_relation"
                />
              </View>
              {initialValues && values.category === 1 && (
                <View style={styles.AddSessionContainer}>
                  {values.new_sessions &&
                    values.new_sessions.map((session, index) => (
                      <View key={session.session_number}>
                        <NewSessionForm
                          session_number={session.session_number}
                          index={index}
                        />
                      </View>
                    ))}
                  <AppButton
                    title="Add New Session"
                    bg={Colors.appColor}
                    style={styles.addSessionButton}
                    onPress={() => addNewSession(values, setFieldValue)}
                  />
                </View>
              )}

              <SubmitButton
                disabled={isSubmitting}
                bg={Colors.appColor}
                textColor={Colors.white}
              />
            </>
          )}
        </Formik>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  AddSessionContainer: {
    flex: 1,
    marginBottom: 60,
  },
  addSessionButton: {
    color: Colors.white,
  },
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
