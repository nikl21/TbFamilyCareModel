import React, {useContext, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import AppText from './AppText';
import routes from '../Navigation/routes';
import {AppContext} from './AppContext';
// import i18n from '../Translations';
import {useTranslation} from 'react-i18next';

export default function CustomDrawerContent(props) {
  const {i18n} = useTranslation();
  const {isLoggedIn, setLoggedIn, setUserData} = useContext(AppContext);
  const [lan, setLang] = useState(false);
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
          <AppText style={styles.drawerHeader}>{i18n.t('menu.hello')}</AppText>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label={i18n.t('menu.language')}
          style={styles.menu}
          onPress={() => setLang(lang => !lang)}
        />
        {lan && (
          <>
            <DrawerItem
              label={i18n.t('menu.english')}
              style={styles.submenu}
              onPress={() => {
                i18n.changeLanguage('en');
                setLang(lang => !lang);
                props.navigation.toggleDrawer();
              }}
            />
            <DrawerItem
              label={i18n.t('menu.hindi')}
              style={styles.submenu}
              onPress={() => {
                i18n.changeLanguage('hi');
                setLang(lang => !lang);
                props.navigation.toggleDrawer();
              }}
            />
          </>
        )}

        <DrawerItem
          label={i18n.t('menu.logout')}
          onPress={() => {
            setLoggedIn(!isLoggedIn);
            setUserData(null);

            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('username');
          }}
        />
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
  menu: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  submenu: {
    marginLeft: 40,
    marginTop: -15,
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
