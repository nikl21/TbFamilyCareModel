import React, {useRef, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {Colors} from '../Theme';
import PatientForm from '../Components/forms/PatientForm';
import routes from '../Navigation/routes';

export default function AddPatientScreen({navigation}) {
  const scrollRef = useRef();
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.form}>
        <PatientForm
          onSubmit={(values, {resetForm}) => {
            firestore()
              .collection('Patients')
              .add(values)
              .then(() => {
                resetForm();
                console.log('User added!');
                navigation.navigate(routes.SESSIONS);
                scrollRef.current?.scrollTo({
                  y: 0,
                  animated: true,
                });
              });
            console.log(values);
          }}
        />
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
