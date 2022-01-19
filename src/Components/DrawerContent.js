import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';
import routes from '../Navigation/routes';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={props.navigation.toggleDrawer}>
            <Icon
              name={'close'}
              size={30}
              color={Colors.text}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerContent}>
          <AppText style={styles.drawerHeader}>Hello!</AppText>
        </View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  drawerContent: {
    padding: 20,
  },
  drawerHeader: {
    fontSize: 32,
    fontFamily: 'Assistant-Bold',
    color: Colors.appColor,
  },
  iconContainer: {
    height: 60,
  },
  icon: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
});