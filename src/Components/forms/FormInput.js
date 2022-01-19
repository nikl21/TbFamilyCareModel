import React, {useState} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../Theme';
import AppText from '../AppText';

export default function FormInput({icon, type, style, label, ...otherProps}) {
  const [hidePass, setHidePass] = useState(true);
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      {icon && type === 'password' ? (
        <View style={[styles.inputContainer, style]}>
          {icon && (
            <Icon
              name={icon}
              size={30}
              color={Colors.appColor}
              style={styles.icon}
            />
          )}
          <TextInput
            placeholderTextColor={Colors.gray}
            {...otherProps}
            secureTextEntry={
              type === 'password' ? (hidePass ? true : false) : false
            }
            style={styles.text}
          />
          {type === 'password' && (
            <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
            />
          )}
        </View>
      ) : (
        <View>
          <TextInput
            style={[styles.inputContainer, style]}
            placeholderTextColor={Colors.gray}
            {...otherProps}
            secureTextEntry={
              type === 'password' ? (hidePass ? true : false) : false
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: 'capitalize',
  },
  inputContainer: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.containerBorder,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: Colors.text,
  },
});
