import React, {useRef, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

import {Colors} from '../Theme';
import PatientForm from '../Components/forms/PatientForm';

export default function EditPatientScreen({route, navigation}) {
  const {key, ...initialValues} = route.params;
  const scrollRef = useRef();

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.form}>
        <PatientForm
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {
            console.log('values', values.date);
            firestore()
              .collection('Patients')
              .doc(key)
              .update(values)
              .then(() => {
                resetForm();
                console.log('User added!');
                navigation.navigate('SessionLists');
                scrollRef.current?.scrollTo({
                  y: 0,
                  animated: true,
                });
              });
            console.log(values);
            NetInfo.fetch().then(state => {
              if (!state.isConnected) {
                navigation.navigate('SessionLists');
              }
            });
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
    padding: 20,
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
