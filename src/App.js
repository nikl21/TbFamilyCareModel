import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, StatusBar, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors, Images} from './Theme';
import SplashScreen from 'react-native-splash-screen';

import Login from './Screens/Login';
import {Layout} from './Theme';
import HomeScreen from './Screens/HomeScreen';
import AddPatientScreen from './Screens/AddPatientScreen';
import SessionsScreen from './Screens/SessionsScreen';
import SignUp from './Screens/SignUp';
import AuthNavigator from './Navigation/AuthNavigator';
import navigationTheme from './Navigation/navigationTheme';
import AppNavigator from './Navigation/AppNavigator';
import {AppContext} from './Components/AppContext';
// import './Translations';

const App = () => {
  const [patientData, setPatientData] = useState(null);
  const [userData, setUserData] = useState(null);
  const providerValue = useMemo(
    () => ({
      patientData,
      setPatientData,
      userData,
      setUserData,
    }),
    [patientData, userData],
  );

  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppContext.Provider value={providerValue}>
        <SafeAreaView style={Layout.fill}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.appColor}
          />
          <AppNavigator />
          {/* <AuthNavigator /> */}
        </SafeAreaView>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default App;
