import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Colors} from '../Theme';
import {AppForm, AppFormField, AppText, SubmitButton} from '../Components';
import {ProfileSchema} from '../Services/formData';
import {axiosApi} from '../Services/api/axiosApi';
import {AppContext} from '../Components/AppContext';
import StatePicker from '../Components/forms/StatePicker';

export default function EditProfileScreen({route, navigation}) {
  const {stateName, initialValues} = route.params;
  const {userData, setUserData} = useContext(AppContext);

  const [token, setToken] = useState(null);
  const scrollRef = useRef();
  //Not filtering for districts right now as the data only has districts from MP
  const getData = async isMounted => {
    try {
      const value = await AsyncStorage.getItem('token').then(value => {
        if (isMounted) {
          setToken(value);
        }
      });
      return value;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    let isMounted = true;
    getData(isMounted);
    return () => {
      isMounted = false;
    };
  });
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.form}>
        <AppForm
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={values => {
            console.log(values);
            axiosApi
              .put('/users/profile.json', values, {
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              })
              .then(response => {
                console.log('res', response.data);
                setUserData(response.data);
                navigation.navigate('ProfileScreen');
                // setUserData(null);
              })
              .catch(error => {
                console.log(error);
              });
          }}>
          <AppText style={styles.text}>Edit Profile</AppText>

          <AppFormField
            name="name"
            label="Name"
            placeholder="John Doe"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <AppFormField
            name="mobile_number"
            label="Phone Number"
            placeholder="9876543210"
            maxLength={10}
            keyboardType={'numeric'}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <AppFormField
            name="facility_name"
            label="Health and Wellness Center"
            placeholder="Name of HWC"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <StatePicker name="state_id" token={token} stateName={stateName} />
          <View style={styles.buttonContainer}>
            <SubmitButton bg={Colors.secondaryColor} style={styles.button} />
          </View>
        </AppForm>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {paddingVertical: 30},
  button: {color: Colors.white},

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
