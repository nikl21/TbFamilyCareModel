import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, Modal, Button} from 'react-native';
import i18n from '../../Translations';

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

export default function PatientForm({onSubmit, id, initialValues, navigation}) {
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [openSD, setOpenSD] = useState(false);
  const [openTR, setOpenTR] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
                  createDate: new Date(),
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
                  addSecondCaregiver: '',
                  c_name_2: '',
                  c_age_2: '',
                  c_category_2: '',
                  c_tested_negative_2: '',
                  c_gender_2: '',
                  c_relation_2: '',
                  c_phone_2: '',
                  c_second_phone_2: '',
                  addThirdCaregiver: '',
                  c_name_3: '',
                  c_age_3: '',
                  c_category_3: '',
                  c_tested_negative_3: '',
                  c_gender_3: '',
                  c_relation_3: '',
                  c_phone_3: '',
                  c_second_phone_3: '',
                  new_sessions: [],
                  user: username,
                  notes: '',
                }
          }
          validationSchema={PatientFormSchema}
          onSubmit={onSubmit}>
          {({values, setFieldValue, isSubmitting}) => (
            <>
              <AppText style={styles.text}>
                {i18n.t('addPatient.heading1')}
              </AppText>
              <AppDatePicker
                modal
                label={i18n.t('addPatient.date')}
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
                  label={i18n.t('addPatient.patientName')}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="age"
                  label={i18n.t('addPatient.age')}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="phone"
                  label={i18n.t('addPatient.patientPH1')}
                  placeholder="9876543210"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="second_phone"
                  label={i18n.t('addPatient.patientPH2')}
                  placeholder="9876543210"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="third_phone"
                  label={i18n.t('addPatient.patientPH3')}
                  placeholder="9876543210"
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppRadioButton
                  label={i18n.t('addPatient.patientCategory')}
                  radio_props={categoryOptions}
                  name="category"
                />
                {setDynamicValues(values, setFieldValue)}
                {values.category === 0 && (
                  <AppRadioButton
                    label={i18n.t('addPatient.sampleCollected')}
                    radio_props={sampleOptions}
                    name="sample_collected"
                  />
                )}
                {values.category === 0 && values.sample_collected === 0 && (
                  <AppRadioButton
                    label={i18n.t('addPatient.sampleSentToDMC')}
                    radio_props={dmcOptions}
                    name="sample_sent"
                  />
                )}

                {values.category === 0 &&
                  values.sample_collected === 0 &&
                  values.sample_sent === 0 && (
                    <AppDatePicker
                      modal
                      label={i18n.t('addPatient.sampleSentDate')}
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
                      label={i18n.t('addPatient.sputumProvided')}
                      radio_props={cupOptions}
                      name="cup_provided"
                    />
                  )}
                {values.category === 0 &&
                  values.sample_collected === 0 &&
                  values.sample_sent === 0 &&
                  values.cup_provided === 0 && (
                    <AppRadioButton
                      label={i18n.t('addPatient.sampleNotSent')}
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
                      label={i18n.t('addPatient.testResults')}
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
                      label={i18n.t('addPatient.dateofTestResults')}
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
                      label={i18n.t('addPatient.typeOfPatient')}
                      radio_props={patientTypeOptions}
                      name="patient_type"
                    />
                    <AppDatePicker
                      modal
                      label={i18n.t('addPatient.dateOfDiagnosis')}
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
                      label={i18n.t('addPatient.dateOfTreatmentInitiation')}
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
                      label={i18n.t('addPatient.progressTrackerReceived')}
                      radio_props={trackerOptions}
                      name="tracker_recieved"
                    />
                    {values.tracker_recieved === 0 && (
                      <>
                        <AppRadioButton
                          label={i18n.t('addPatient.filledInWeek1')}
                          radio_props={trackerWeekOptions}
                          name="t_week1"
                        />
                        <AppRadioButton
                          label={i18n.t('addPatient.filledInWeek2')}
                          radio_props={trackerWeekOptions}
                          name="t_week2"
                        />
                        <AppRadioButton
                          label={i18n.t('addPatient.filledInWeek3')}
                          radio_props={trackerWeekOptions}
                          name="t_week3"
                        />
                        <AppRadioButton
                          label={i18n.t('addPatient.filledInWeek4')}
                          radio_props={trackerWeekOptions}
                          name="t_week4"
                        />
                      </>
                    )}
                  </>
                )}
                <AppRadioButton
                  label={i18n.t('addPatient.gender')}
                  isHorizontal={false}
                  radio_props={genderOptions}
                  name="gender"
                />
                <AppFormField
                  name="address"
                  label={i18n.t('addPatient.address')}
                  placeholder="House Number,Street,Area"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {(values.category === 1 || values.sample_test_result === 0) && (
                  <>
                    <AppRadioButton
                      label={i18n.t('addPatient.nikshay')}
                      radio_props={npyOptions}
                      name="npy_availed"
                    />
                    <AppRadioButton
                      label={i18n.t('addPatient.treatmentCompleted')}
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
                  label={i18n.t('addPatient.caregiverName')}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="c_age"
                  label={i18n.t('addPatient.age')}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="c_phone"
                  placeholder="9876543210"
                  label={i18n.t('addPatient.patientPH1')}
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppFormField
                  name="c_second_phone"
                  placeholder="9876543210"
                  label={i18n.t('addPatient.patientPH2')}
                  maxLength={10}
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AppRadioButton
                  isHorizontal={false}
                  label={i18n.t('addPatient.caregiverCategory')}
                  radio_props={caregiverOptions}
                  name="c_category"
                />

                <AppRadioButton
                  label={i18n.t('addPatient.gender')}
                  isHorizontal={false}
                  radio_props={genderOptions}
                  name="c_gender"
                />
                <AppRadioButton
                  isHorizontal={false}
                  label={i18n.t('addPatient.relation')}
                  radio_props={relationOptions}
                  name="c_relation"
                />
              </View>

              {values.addSecondCaregiver ? (
                <>
                  <AppText style={styles.text}>Caregiver information 2</AppText>

                  <View style={styles.inputContainer}>
                    <AppFormField
                      name="c_name_2"
                      label={i18n.t('addPatient.caregiverName')}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppFormField
                      name="c_age_2"
                      label={i18n.t('addPatient.age')}
                      keyboardType={'numeric'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppFormField
                      name="c_phone_2"
                      placeholder="9876543210"
                      label={i18n.t('addPatient.patientPH1')}
                      maxLength={10}
                      keyboardType={'numeric'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppFormField
                      name="c_second_phone_2"
                      placeholder="9876543210"
                      label={i18n.t('addPatient.patientPH2')}
                      maxLength={10}
                      keyboardType={'numeric'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppRadioButton
                      isHorizontal={false}
                      label={i18n.t('addPatient.caregiverCategory')}
                      radio_props={caregiverOptions}
                      name="c_category_2"
                    />

                    <AppRadioButton
                      label={i18n.t('addPatient.gender')}
                      isHorizontal={false}
                      radio_props={genderOptions}
                      name="c_gender_2"
                    />
                    <AppRadioButton
                      isHorizontal={false}
                      label={i18n.t('addPatient.relation')}
                      radio_props={relationOptions}
                      name="c_relation_2"
                    />
                  </View>
                </>
              ) : null}
              {values.addThirdCaregiver ? (
                <>
                  <AppText style={styles.text}>Caregiver information 3</AppText>

                  <View style={styles.inputContainer}>
                    <AppFormField
                      name="c_name_3"
                      label={i18n.t('addPatient.caregiverName')}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppFormField
                      name={i18n.t('addPatient.age')}
                      label="age"
                      keyboardType={'numeric'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppFormField
                      name="c_phone_3"
                      placeholder="9876543210"
                      label={i18n.t('addPatient.patientPH1')}
                      maxLength={10}
                      keyboardType={'numeric'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppFormField
                      name="c_second_phone_3"
                      placeholder="9876543210"
                      label={i18n.t('addPatient.patientPH2')}
                      maxLength={10}
                      keyboardType={'numeric'}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <AppRadioButton
                      isHorizontal={false}
                      label={i18n.t('addPatient.caregiverCategory')}
                      radio_props={caregiverOptions}
                      name="c_category_3"
                    />

                    <AppRadioButton
                      label={i18n.t('addPatient.gender')}
                      isHorizontal={false}
                      radio_props={genderOptions}
                      name="c_gender_3"
                    />
                    <AppRadioButton
                      isHorizontal={false}
                      label={i18n.t('addPatient.relation')}
                      radio_props={relationOptions}
                      name="c_relation_3"
                    />
                  </View>
                </>
              ) : null}
              <View style={styles.inputContainer}>
                <AppFormField
                  name="notes"
                  label={i18n.t('addPatient.notes')}
                  autoCapitalize="none"
                  autoCorrect={false}
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
                    title={i18n.t('addPatient.addnewSession')}
                    bg={Colors.appColor}
                    style={styles.addSessionButton}
                    onPress={() => addNewSession(values, setFieldValue)}
                  />
                </View>
              )}

              {!values.addSecondCaregiver && (
                <View style={styles.AddSessionContainer}>
                  <AppButton
                    title="Add Second Caregiver"
                    bg="#203468"
                    style={{color: 'white'}}
                    onPress={() => setFieldValue('addSecondCaregiver', true)}
                  />
                </View>
              )}
              {values.addSecondCaregiver && !values.addThirdCaregiver ? (
                <View style={styles.AddSessionContainer}>
                  <AppButton
                    title="Add Third Caregiver"
                    bg="#203468"
                    style={{color: 'white'}}
                    onPress={() => setFieldValue('addThirdCaregiver', true)}
                  />
                </View>
              ) : null}

              <SubmitButton
                disabled={isSubmitting}
                bg={Colors.appColor}
                textColor={Colors.white}
              />
              {initialValues && (
                <>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                          {i18n.t('addPatient.deleteConfirm')}
                        </Text>
                        <View style={styles.buttonContainer}>
                          <Button
                            style={styles.button}
                            title="Cancel"
                            onPress={() => setModalVisible(!modalVisible)}
                          />
                          <Button
                            style={styles.button}
                            title="Confirm"
                            onPress={() => {
                              firestore()
                                .collection('Patients')
                                .doc(id)
                                .delete();
                              navigation.pop();
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <View style={styles.DeleteButtonContainer}>
                    <AppButton
                      title={i18n.t('addPatient.deleteSession')}
                      bg={Colors.appColor}
                      style={styles.addSessionButton}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    />
                  </View>
                </>
              )}
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
  DeleteButtonContainer: {
    marginTop: 60,
  },
  addSessionButton: {
    color: Colors.white,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 30,
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Assistant-SemiBold',
    fontSize: 24,
    marginBottom: 20,
  },
});
