import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, StatusBar, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Colors, Images} from './Theme';
import SplashScreen from 'react-native-splash-screen';

import {Layout} from './Theme';
import navigationTheme from './Navigation/navigationTheme';
import AppNavigator from './Navigation/AppNavigator';
import {AppContext} from './Components/AppContext';
import AuthNavigator from './Navigation/AuthNavigator';
import './Translations';

const App = () => {
  const [patientData, setPatientData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 1200); // amount of time the splash is shown from the time component is rendered
  }, []);

  useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

  const providerValue = useMemo(
    () => ({
      patientData,
      setPatientData,
      userData,
      setUserData,
      isLoggedIn,
      setLoggedIn,
      stateData,
      setStateData,
    }),
    [patientData, userData, isLoggedIn, stateData],
  );

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token').then(value => value);
        const username_stored = await AsyncStorage.getItem('username').then(
          value => value,
        );
        if (token && username_stored) {
          setLoggedIn(true);
        }
        return token;
      } catch (error) {
        console.log('error', error);
      }
    };
    getToken();
  }, []);
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppContext.Provider value={providerValue}>
        <SafeAreaView style={Layout.fill}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.appColor}
          />
          {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </SafeAreaView>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default App;
