import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import {Colors, Images} from '../Theme';
import {SubmitButton, AppForm, AppFormField, AppText} from '../Components';
import {LoginSchema} from '../Services/formData';

export default function Login({navigation}) {
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
            <View style={styles.signUp}>
              <AppText>Don't have an account?</AppText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <AppText style={styles.signUpButton}>Sign Up</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomBanner}>
          <View style={styles.box}>
            <SubmitButton
              title="LOGIN"
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
    backgroundColor: Colors.error,
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
