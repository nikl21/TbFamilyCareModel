import React, {useRef} from 'react';
import {View, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {Colors} from '../Theme';
import PatientForm from '../Components/forms/PatientForm';
import routes from '../Navigation/routes';
import NetInfo from '@react-native-community/netinfo';

export default function AddPatientScreen({navigation}) {
  const scrollRef = useRef();
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container} ref={scrollRef}>
        <View style={styles.form}>
          <PatientForm
            onSubmit={(values, {resetForm}) => {
              console.log(values);
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
              NetInfo.fetch().then(state => {
                if (!state.isConnected) {
                  navigation.navigate(routes.SESSIONS);
                }
              });
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
