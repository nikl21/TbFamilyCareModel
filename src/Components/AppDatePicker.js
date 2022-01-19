import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {Colors} from '../Theme';
import AppText from './AppText';

function formatDate(date) {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  var date1 = new Date(date);
  // @ts-ignore
  return date1.toLocaleDateString([], options);
}

export default function AppDatePicker({
  setOpen,
  name,
  date,
  label = 'Date',
  ...props
}) {
  return (
    <>
      <AppText>{label}</AppText>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <View style={styles.container}>
          <AppText style={styles.text} onPress={() => setOpen(false)}>
            {formatDate(date)}
          </AppText>
          <DatePicker
            date={date}
            {...props}
            mode="date"
            maximumDate={new Date()}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  container: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.containerBorder,
  },
});
