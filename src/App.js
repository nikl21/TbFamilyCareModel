import React from 'react';
import {SafeAreaView, StatusBar, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors, Images} from './Theme';

import Login from './Screens/Login';
import {Layout} from './Theme';
import HomeScreen from './Screens/HomeScreen';
import AddPatientScreen from './Screens/AddPatientScreen';
import SessionsScreen from './Screens/SessionsScreen';
import SignUp from './Screens/SignUp';
// import './Translations';

const App = () => (
  <NavigationContainer>
    <SafeAreaView style={Layout.fill}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.appColor} />
      {/* <AddPatientScreen /> */}
      {/* <SessionsScreen /> */}
      <Login />
      {/* <SignUp /> */}
    </SafeAreaView>
  </NavigationContainer>
);

export default App;
