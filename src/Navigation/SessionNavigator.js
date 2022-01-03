import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SessionsScreen from '../Screens/SessionsScreen';
import EditPatientScreen from '../Screens/EditPatientScreen';
import {Colors} from '../Theme';

const Stack = createNativeStackNavigator();

const SessionNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SessionLists" component={SessionsScreen} />
    <Stack.Screen name="EditSessions" component={EditPatientScreen} />
  </Stack.Navigator>
);

export default SessionNavigator;
