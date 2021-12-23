import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AppButton, AppText} from '../Components';
import {Colors, Images} from '../Theme';

export default function GetStartedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
          <Image source={Images.jlogo} style={styles.jlogo} />
        </View>
      </View>
      <View style={styles.bottomBanner}>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTextContainer}>
            <AppText style={styles.bottomText}>Let's get started.</AppText>
          </View>
          <AppButton text={'Get Started'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBanner: {
    backgroundColor: Colors.appColor,
    flex: 0.5,
  },
  bottomText: {
    color: Colors.white,
    fontFamily: 'Assistant-Bold',
    fontSize: 30,
  },
  bottomContainer: {
    padding: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  bottomTextContainer: {
    flexDirection: 'column',
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
  jlogo: {
    height: 150,
    width: 300,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoContainer: {
    paddingVertical: 50,
  },
  topBanner: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  inputContainer: {
    marginHorizontal: 50,
  },
});
