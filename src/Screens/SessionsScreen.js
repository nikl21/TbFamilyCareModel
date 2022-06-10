import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AppButton, AppInput, AppText} from '../Components';
import ListSession from '../Components/ListSession';
import {Colors, Images} from '../Theme';
import {AppContext} from '../Components/AppContext';
import {useTranslation} from 'react-i18next';

export default function SessionsScreen({navigation}) {
  const [filteredData, setFilteredData] = useState('');
  const [username, setUsername] = useState(false);
  const {i18n} = useTranslation();

  const {patientData, setPatientData} = useContext(AppContext);
  function onChangeText(text) {
    if (text.trim().length !== 0) {
      const filtered = patientData.filter(
        item => item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1,
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(patientData);
    }
  }

  useEffect(() => {
    const getUsername = async () => {
      try {
        await AsyncStorage.getItem('username').then(value =>
          setUsername(value),
        );
      } catch (error) {
        console.log('error', error);
      }
    };
    getUsername();
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Patients')
      .orderBy('date', 'desc')
      .where('user', '==', username ? username : '')
      .onSnapshot(
        querySnapshot => {
          const patients = [];
          querySnapshot.forEach(documentSnapshot => {
            patients.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setPatientData(patients);
          setFilteredData(patients);
        },
        err => console.log(err),
      );

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [username, setPatientData]);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('Patients')
  //     .get()
  //     .then(snap => {
  //       // will return the collection size
  //       console.log(snap.size);
  //     });

  //   // Unsubscribe from events when no longer in use
  //   return () => subscriber();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topInputContainer}>
          <AppText style={styles.title}>
            {i18n.t('previousPatient.hello')}
          </AppText>
          <AppText style={styles.subtitle}>
            {i18n.t('previousPatient.subtitle')}
            {/* You can <AppText style={styles.subtitleBold}>view or edit</AppText>{' '}
            your previous patient entries by clicking on them. */}
          </AppText>
          <View style={styles.lineStyle} />
          <View style={styles.impactContainer}>
            <View style={styles.impactContainer}>
              <AppText style={styles.impactTitle}>
                {patientData && patientData.length}
              </AppText>
              <AppText style={styles.impactSubtitle}>
                {i18n.t('previousPatient.impacted')}
              </AppText>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {!patientData ? (
          <ActivityIndicator />
        ) : patientData && patientData.length === 0 ? (
          <View style={styles.noImageContainer}>
            <Image source={Images.noClass} style={styles.noClass} />
          </View>
        ) : (
          <View>
            <View style={styles.searchContainer}>
              <AppInput
                // label="Search Patient"
                placeholder="Search Patient"
                onChangeText={onChangeText}
                search={true}
              />
            </View>
            <FlatList
              data={filteredData}
              keyExtractor={message => message.key.toString()}
              ListFooterComponent={<View style={{height: 90}} />}
              renderItem={({item, index}) => {
                return (
                  <ListSession
                    name={item.name}
                    date={item.date.toDate()}
                    index={index}
                    onPress={() => navigation.navigate('EditSessions', item)}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          style={styles.button}
          title={i18n.t('previousPatient.button')}
          bg={Colors.appColor}
          onPress={() => navigation.navigate('Add Patient')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color: Colors.white,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
  topContainer: {
    backgroundColor: Colors.appColor,
    flex: 0.3,
    padding: 30,
  },
  topInputContainer: {
    position: 'absolute',
    bottom: 0,
    margin: 30,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 0.7,
    paddingTop: 10,
  },
  impactContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  impactSubtitle: {
    color: Colors.white,
    fontSize: 18,
    marginHorizontal: 20,
    width: 100,
    fontFamily: 'Assistant-Bold',
  },
  impactTitle: {
    color: Colors.white,
    fontFamily: 'Assistant-Bold',
    fontSize: 32,
  },
  searchContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    // marginTop: 10,
    color: Colors.white,
    fontFamily: 'Assistant-Bold',
    fontSize: 32,
  },

  subtitle: {
    paddingVertical: 10,
    color: Colors.white,
    fontSize: 18,
  },
  subtitleBold: {
    paddingVertical: 10,
    fontFamily: 'Assistant-Bold',

    color: Colors.white,
    fontSize: 18,
  },
  noClass: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
  },
  noImageContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
