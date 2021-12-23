import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {AppText} from '../Components';
import {Colors, Images} from '../Theme';

export default function SessionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topInputContainer}>
          <AppText style={styles.title}>Hello!</AppText>
          <AppText style={styles.subtitle}>
            You can <AppText style={styles.subtitleBold}>view or edit</AppText>{' '}
            your previous patient entries by clicking on them.
          </AppText>
          <View style={styles.lineStyle} />
          <View style={styles.impactContainer}>
            <View style={styles.impactContainer}>
              <AppText style={styles.impactTitle}>8</AppText>
              <AppText style={styles.impactSubtitle}>Patients Impacted</AppText>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.noImageContainer}>
          <Image source={Images.noClass} style={styles.noClass} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
  topContainer: {
    backgroundColor: Colors.appColor,
    flex: 0.3,
    padding: 30,
  },
  topInputContainer: {
    position: 'absolute',
    bottom: 0,
    margin: 30,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 0.7,
  },
  impactContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  impactSubtitle: {
    color: Colors.white,
    fontSize: 18,
    marginHorizontal: 20,
    width: 100,
    fontFamily: 'Assistant-Bold',
  },
  impactTitle: {
    color: Colors.white,
    fontFamily: 'Assistant-Bold',
    fontSize: 32,
  },

  title: {
    // marginTop: 10,
    color: Colors.white,
    fontFamily: 'Assistant-Bold',
    fontSize: 32,
  },

  subtitle: {
    paddingVertical: 10,
    color: Colors.white,
    fontSize: 18,
  },
  subtitleBold: {
    paddingVertical: 10,
    fontFamily: 'Assistant-Bold',

    color: Colors.white,
    fontSize: 18,
  },
  noClass: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
  },
  noImageContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
