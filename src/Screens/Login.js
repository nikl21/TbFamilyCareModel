import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import * as Yup from 'yup';

import {Colors, Images} from '../Theme';
import {SubmitButton, AppForm, AppFormField} from '../Components';
import {LoginSchema} from '../Services/formData';

export default function Login() {
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          console.log(values);
        }}>
        <View style={styles.topBanner}>
          <Image source={Images.logo} style={styles.logo} />
          <View style={styles.inputContainer}>
            <AppFormField
              name="username"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              type="password"
            />
          </View>
        </View>
        <View style={styles.bottomBanner}>
          <SubmitButton title="LOGIN" />
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBanner: {
    backgroundColor: Colors.appColor,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
  inputContainer: {
    marginHorizontal: 50,
  },
});
