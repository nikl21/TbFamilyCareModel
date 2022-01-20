import React, {useRef, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Colors} from '../Theme';
import {AppForm, AppFormField, AppText, SubmitButton} from '../Components';
import {ProfileSchema} from '../Services/formData';

export default function EditProfileScreen({navigation}) {
  const scrollRef = useRef();
  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.form}>
        <AppForm
          initialValues={{
            name: '',
            phone: '',
            hwcName: '',
            location: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          <AppText style={styles.text}>patient information</AppText>
          <AppFormField
            name="name"
            label="Full Name"
            placeholder="John Doe"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <AppFormField
            name="phone"
            label="Phone Number"
            placeholder="9876543210"
            maxLength={10}
            keyboardType={'numeric'}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <AppFormField
            name="hwcName"
            label="Health and Wellness Center"
            placeholder="Name of HWC"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <AppFormField
            name="location"
            label="Location"
            placeholder="Location of HWC"
            autoCapitalize="words"
            autoCorrect={false}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <SubmitButton bg={Colors.secondaryColor} style={styles.button} />
          </View>
        </AppForm>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {paddingVertical: 30},
  button: {color: Colors.white},

  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 30,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Assistant-SemiBold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderColor: Colors.containerBorder,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 80,
  },
  inputContainer: {
    marginBottom: 30,
  },
});
