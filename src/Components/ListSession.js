import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dash from 'react-native-dash';

import {Colors} from '../Theme';
import AppText from './AppText';

function ListSession({name, date, index, onPress}) {
  const dayNo = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', {month: 'long'});
  const day = date.toLocaleDateString('locale', {weekday: 'long'});
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {index % 2 !== 0 ? (
          <View style={styles.parent}>
            <View style={styles.circle} />
            <Dash style={styles.dottedBorder} dashColor={Colors.appColor} />
          </View>
        ) : (
          <View style={styles.oddParent}>
            <Dash style={styles.oddDottedBorder} dashColor={Colors.appColor} />

            <View style={styles.oddCircle} />
          </View>
        )}
        <View style={styles.column}>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <AppText style={styles.dayNo}>{dayNo}</AppText>

              <AppText style={styles.text}>{month}</AppText>
              <View style={styles.lineStyle} />
              <AppText style={styles.text}>{day}</AppText>
            </View>
            <Icon
              name={'chevron-right'}
              size={15}
              color={Colors.appColor}
              style={styles.icon}
            />
          </View>
          <AppText style={styles.name}>{name}</AppText>
          <View style={styles.seperator} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // height: 80,
  },
  dayNo: {
    color: Colors.appColor,
    fontFamily: 'Assistant-SemiBold',
    marginHorizontal: 5,
  },
  icon: {
    alignSelf: 'center',
  },
  pattern: {
    width: 40,
  },
  column: {
    flex: 1,
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Assistant-Light',
  },
  name: {
    color: Colors.appColor,
    fontFamily: 'Assistant-SemiBold',
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  seperator: {
    borderWidth: 0.5,
    borderStyle: 'dotted',
    backgroundColor: Colors.appColor,
    borderColor: Colors.appColor,
    marginVertical: 10,
  },
  parent: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 35,
    marginHorizontal: 8,
  },
  oddParent: {
    display: 'flex',
    marginHorizontal: 8,
    borderStyle: 'dotted',
    alignItems: 'center',
    marginTop: -10,
  },
  circle: {
    display: 'flex',
    borderRadius: 100,
    borderColor: Colors.appColor,
    borderWidth: 1,
    height: 8,
    width: 8,
  },
  oddCircle: {
    display: 'flex',
    borderRadius: 100,
    borderColor: Colors.appColor,
    borderWidth: 1,
    height: 8,
    width: 8,
  },
  dottedBorder: {
    height: 30,
    width: 1,
    flexDirection: 'column',
  },
  oddDottedBorder: {
    height: 30,
    width: 1,
    flexDirection: 'column',
  },
  lineStyle: {
    borderWidth: 1,
    backgroundColor: Colors.appColor,
    borderColor: Colors.appColor,
    marginHorizontal: 10,
  },
});
export default ListSession;
