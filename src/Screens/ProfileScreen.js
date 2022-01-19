import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton, AppText} from '../Components';
import {Colors} from '../Theme';

export default function ProfileScreen({navigation}) {
  return (
    <View style={styles.container}>
      <AppText style={styles.header}>personal details </AppText>
      <View style={styles.fieldContainer}>
        <AppText style={styles.label}>Name :</AppText>
        <AppText style={styles.field}>Nikhil Nalin</AppText>
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.label}>Phone :</AppText>
        <AppText style={styles.field}>9400863514</AppText>
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.label}>Health and Wellness Center :</AppText>
        <AppText style={styles.field}>Noora Health</AppText>
      </View>
      <View style={styles.fieldContainer}>
        <AppText style={styles.label}>Location :</AppText>
        <AppText style={styles.field}>Khandwa</AppText>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={'Edit Profile'}
          bg={Colors.secondaryColor}
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.backgroundColor, padding: 30},
  button: {color: Colors.white},
  buttonContainer: {marginTop: 60},
  header: {
    fontSize: 22,
    fontFamily: 'Assistant-SemiBold',
    textTransform: 'uppercase',
    color: Colors.secondaryColor,
    paddingVertical: 20,
  },
  field: {
    fontSize: 16,
    fontFamily: 'Assistant-SemiBold',
  },
  fieldContainer: {flexDirection: 'row', paddingVertical: 10},
  label: {
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'Assistant-SemiBold',
    color: Colors.secondaryColor,
  },
});
