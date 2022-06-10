import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import {Colors, Images} from '../Theme';
import {SubmitButton, AppForm, AppFormField, AppText} from '../Components';
import {LoginSchema} from '../Services/formData';
import {axiosApi} from '../Services/api/axiosApi';
import {AppContext} from '../Components/AppContext';
import AppStatus from '../Components/forms/AppStatus';
import {useTranslation} from 'react-i18next';

export default function Login({navigation}) {
  const {i18n} = useTranslation();

  const {isLoggedIn, setLoggedIn} = useContext(AppContext);

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
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={(values, {setStatus, status}) => {
          axiosApi
            .post('/oauth/token.json', {
              ...values,
              grant_type: 'password',
              client_id: 'xVMtDXOMfuS8kO2ut67MqOJx40YFN85VXTZpSmjKIIY',
              client_secret: 'FTZA1X0C00Xu4jRRpe6SP3etliqJoRPlo-ACAXIBIM4',
            })
            .then(response => {
              console.log(response.data);
              storeData('token', response.data.access_token);
              storeData('username', values.username);
              setStatus(null);
              setLoggedIn(!isLoggedIn);
            })
            .catch(error => {
              console.log(error);
              setStatus('Invalid credentials');
              // console.log(status);
            });
        }}>
        <View style={styles.topBanner}>
          <Image source={Images.logo} style={styles.logo} />
          <View style={styles.inputContainer}>
            <AppFormField
              name="username"
              placeholder={i18n.t('login.username')}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
            <AppFormField
              name="password"
              placeholder={i18n.t('login.password')}
              autoCapitalize="none"
              autoCorrect={false}
              type="password"
              style={styles.input}
            />
            <AppStatus />
            <View style={styles.signUp}>
              <AppText>{i18n.t('login.title1')}</AppText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <AppText style={styles.signUpButton}>
                  {i18n.t('login.signUp')}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomBanner}>
          <View style={styles.box}>
            <SubmitButton
              title={i18n.t('login.button')}
              bg={Colors.white}
              textColor={Colors.appColor}
            />
          </View>
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
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
  },
  inputContainer: {
    marginHorizontal: 50,
  },
  signUp: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    color: Colors.appColor,
  },
});
