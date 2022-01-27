import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Config from 'react-native-config';
import {AppButton, AppText} from '../Components';
import {AppContext} from '../Components/AppContext';
import {axiosApi, fetchClient} from '../Services/api/axiosApi';
import {Colors} from '../Theme';

export default function ProfileScreen({navigation}) {
  const {userData, setUserData} = useContext(AppContext);
  const [token, setToken] = useState(null);

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
    if (token) {
      const data = axiosApi
        .get('/users/profile.json', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(response => {
          isMounted && setUserData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [token, setUserData]);
  return (
    <View style={styles.container}>
      <AppText style={styles.header}>personal details </AppText>
      {!userData ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>Name :</AppText>
            <AppText style={styles.field}>{userData.name}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>Phone :</AppText>
            <AppText style={styles.field}>{userData.mobile_number}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>Health and Wellness Center :</AppText>
            <AppText style={styles.field}>{userData.facility_name}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>Location :</AppText>
            <AppText style={styles.field}>
              {userData.state ? userData.state.name : ''}
            </AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title={'Edit Profile'}
              bg={Colors.secondaryColor}
              style={styles.button}
              onPress={() =>
                navigation.navigate('EditProfile', {
                  initialValues: {
                    name: userData.name,
                    mobile_number: userData.mobile_number,
                    facility_name: userData.facility_name,
                    state_id: userData.state.id,
                  },
                  stateName: userData.state.name,
                })
              }
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.backgroundColor, padding: 30},
  button: {color: Colors.white},
  buttonContainer: {marginTop: 60},
  header: {
    fontSize: 22,
    fontFamily: 'Assistant-SemiBold',
    textTransform: 'uppercase',
    color: Colors.secondaryColor,
    paddingVertical: 20,
  },
  field: {
    fontSize: 16,
    fontFamily: 'Assistant-SemiBold',
  },
  fieldContainer: {flexDirection: 'row', paddingVertical: 10},
  label: {
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'Assistant-SemiBold',
    color: Colors.secondaryColor,
  },
});
