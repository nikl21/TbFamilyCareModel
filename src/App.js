import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
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
// import './Translations';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer theme={navigationTheme}>
      <SafeAreaView style={Layout.fill}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.appColor}
        />
        {/* <AddPatientScreen /> */}
        {/* <SessionsScreen /> */}
        {/* <Login /> */}
        {/* <SignUp /> */}
        {/* <AuthNavigator /> */}
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
