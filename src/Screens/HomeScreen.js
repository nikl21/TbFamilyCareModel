import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AppButton, AppText} from '../Components';
import routes from '../Navigation/routes';
import {Colors, Images} from '../Theme';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <View style={styles.logoContainer}>
          <Image source={Images.welcome} style={styles.logo} />
        </View>
      </View>
      <View style={styles.bottomBanner}>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTextContainer}>
            <AppText style={styles.bottomText}>Let's get started.</AppText>
            <AppText style={styles.bottomSubText}>
              What would you like to do today?
            </AppText>
          </View>
          <AppButton
            title={'Add patient info'}
            bg={Colors.white}
            onPress={() => navigation.jumpTo(routes.ADD_PATIENT)}
          />
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
  buttonText: {
    color: Colors.appColor,
  },
  bottomText: {
    color: Colors.white,
    fontFamily: 'Assistant-Bold',
    fontSize: 28,
  },
  bottomSubText: {
    color: Colors.white,
    fontFamily: 'Assistant-Regular',
    fontSize: 24,
  },
  bottomContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomTextContainer: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  logo: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBanner: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  inputContainer: {
    marginHorizontal: 50,
  },
});
