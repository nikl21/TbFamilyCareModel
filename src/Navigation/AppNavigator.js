import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../Screens/HomeScreen';
import AddPatientScreen from '../Screens/AddPatientScreen';
import {Colors} from '../Theme';
import {StyleSheet, TouchableOpacity} from 'react-native';
import SessionNavigator from './SessionNavigator';
import routes from './routes';
import CustomDrawerContent from '../Components/DrawerContent';
import ProfileNavigator from './ProfileNavigator';
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screen={HomeScreen}
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        drawerType: 'front',
        headerStyle: {
          backgroundColor: Colors.appColor,
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
        },
        headerTitleStyle: {
          fontFamily: 'Assistant-Bold',
          fontSize: 24,
          color: Colors.white,
        },
        headerBackTitleStyle: {
          fontFamily: 'Assistant-Regular',
        },
        headerTintColor: 'white',
        headerLeft: () => {},
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon
              name="bars"
              size={30}
              color={Colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        ),
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          width: 240,
        },
        drawerItemStyle: styles.item,
        drawerPosition: 'right',
      })}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.backgroundColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontFamily: 'Assistant-Regular',
            color: Colors.backgroundColor,
          },
          headerBackTitleStyle: {
            fontFamily: 'Assistant-Regular',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon
                name="bars"
                size={30}
                color={Colors.appColor}
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({route, navigation}) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleStyle: {
            fontFamily: 'Assistant-Bold',
            fontSize: 24,
            color: Colors.white,
          },
          headerStyle: {
            backgroundColor: Colors.secondaryColor,
          },
          headerLeft: () => {
            if (
              getHeaderTitle(route) === 'Edit Patient' ||
              getHeaderTitle(route) === 'Edit Profile'
            ) {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.PROFILE_SCREEN)}>
                  <Icon
                    name="arrow-left"
                    size={20}
                    color={Colors.white}
                    style={styles.iconLeft}
                  />
                </TouchableOpacity>
              );
            }
          },
        })}
      />
      <Drawer.Screen name="Add Patient" component={AddPatientScreen} />
      <Drawer.Screen
        name="Previous Patients"
        component={SessionNavigator}
        options={({route, navigation}) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleStyle: {
            fontFamily: 'Assistant-Bold',
            fontSize: 24,
            color:
              getHeaderTitle(route) !== 'Edit Patient'
                ? Colors.appColor
                : Colors.white,
          },
          headerLeft: () => {
            if (getHeaderTitle(route) === 'Edit Patient') {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.SESSION_LISTS)}>
                  <Icon
                    name="arrow-left"
                    size={20}
                    color={Colors.white}
                    style={styles.iconLeft}
                  />
                </TouchableOpacity>
              );
            }
          },
        })}
      />
    </Drawer.Navigator>
  );
};

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';

  switch (routeName) {
    case 'Sessions':
      return '';
    case 'EditSessions':
      return 'Edit Patient';
    case 'ProfileScreen':
      return 'ProfileScreen';
    case 'EditProfile':
      return 'Edit Profile';
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 30,
    // marginTop: 10,
  },
  iconLeft: {
    marginLeft: 30,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: Colors.appColor,
  },
});
export default AppNavigator;
