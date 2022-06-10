import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {AppButton, AppText} from '../Components';
import {AppContext} from '../Components/AppContext';
import {axiosApi, fetchClient} from '../Services/api/axiosApi';
import {Colors} from '../Theme';
import {useTranslation} from 'react-i18next';

export default function ProfileScreen({navigation}) {
  const {i18n} = useTranslation();
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
    if (token && !userData) {
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
  }, [token, setUserData, userData]);
  return (
    <View style={styles.container}>
      <AppText style={styles.header}>{i18n.t('profile.heading')}</AppText>
      {!userData ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>{i18n.t('profile.name')} :</AppText>
            <AppText style={styles.field}>{userData.name}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>{i18n.t('profile.phone')} :</AppText>
            <AppText style={styles.field}>{userData.mobile_number}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>{i18n.t('profile.hwc')} :</AppText>
            <AppText style={styles.field}>{userData.facility_name}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>
              {i18n.t('profile.location')} :
            </AppText>
            <AppText style={styles.field}>
              {userData.state ? userData.state.name : ''}
            </AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>
              {i18n.t('profile.district')} :
            </AppText>
            <AppText style={styles.field}>
              {userData.district ? userData.district.name : ''}
            </AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.label}>{i18n.t('profile.block')} :</AppText>
            <AppText style={styles.field}>
              {userData.block ? userData.block.name : ''}
            </AppText>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title={i18n.t('profile.button')}
              bg={Colors.secondaryColor}
              style={styles.button}
              onPress={() =>
                navigation.navigate('EditProfile', {
                  initialValues: {
                    name: userData.name,
                    mobile_number: userData.mobile_number,
                    facility_name: userData.facility_name,
                    state_id: userData.state ? userData.state.id : 14,
                    district_id: userData.district
                      ? userData.district.id
                      : null,
                    block_id: userData.block ? userData.block.id : null,
                  },
                  stateName: userData.state
                    ? userData.state.name
                    : 'Madhya Pradesh',
                  districtName: userData.district ? userData.district.name : '',
                  blockName: userData.block ? userData.block.name : '',
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
    flexWrap: 'wrap',
    flex: 1,
  },
  fieldContainer: {flexDirection: 'row', paddingVertical: 10},
  label: {
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'Assistant-SemiBold',
    color: Colors.secondaryColor,
  },
});
