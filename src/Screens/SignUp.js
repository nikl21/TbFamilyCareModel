import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {Colors, Images} from '../Theme';
import {
  SubmitButton,
  AppForm,
  AppFormField,
  AppButton,
  AppText,
} from '../Components';
import {SignUpSchema} from '../Services/formData';
import {axiosApi} from '../Services/api/axiosApi';
import {AppContext} from '../Components/AppContext';

export default function SignUp({navigation}) {
  const {isLoggedIn, setLoggedIn} = useContext(AppContext);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token').then(value => {
        console.log('token', value);
      });
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
          name: '',
          facility_name: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={values => {
          axiosApi
            .post('/users/signup.json', values)
            .then(response => {
              console.log('signed up', response.data);
              storeData('username', response.data.access_token);
              storeData('token', values.username);
              setLoggedIn(!isLoggedIn);
            })
            .catch(error => {
              console.log(error);
            });
        }}>
        <View style={styles.topBanner}>
          <Image source={Images.logo} style={styles.logo} />
          <View style={styles.inputContainer}>
            <AppFormField
              name="username"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
            <AppFormField
              name="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              type="password"
              style={styles.input}
            />
            <AppFormField
              name="passwordConfirmation"
              placeholder="Confirm Password"
              autoCapitalize="none"
              autoCorrect={false}
              type="password"
              style={styles.input}
            />
            <AppFormField
              name="facility_name"
              placeholder="Facility Name"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
            <AppFormField
              name="name"
              placeholder="CHO Name"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <View style={styles.box}>
            <SubmitButton
              title="SIGN UP"
              bg={Colors.appColor}
              textColor={Colors.white}
            />
          </View>
          <View style={styles.login}>
            <AppText>Go back to</AppText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <AppText style={styles.loginButton}> Login</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 30,
  },
  bottomBanner: {
    backgroundColor: Colors.appColor,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  login: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loginButton: {
    color: Colors.appColor,
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  topBanner: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    // paddingHorizontal: 30,
  },
  input: {
    borderColor: Colors.appColor,
    paddingVertical: Platform.OS === 'ios' ? 10 : 2,
  },
  inputContainer: {
    marginHorizontal: 50,
  },
});
