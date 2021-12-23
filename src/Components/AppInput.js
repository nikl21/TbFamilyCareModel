import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Colors, Layout} from '../Theme';

export default function AppInput({icon, type, ...otherProps}) {
  const [hidePass, setHidePass] = useState(true);
  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          name={icon}
          size={30}
          color={Colors.appColor}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[Layout.textInput]}
        placeholderTextColor={Colors.grey}
        {...otherProps}
        secureTextEntry={
          type === 'password' ? (hidePass ? true : false) : false
        }
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
  );
}

const styles = StyleSheet.create({
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
    borderColor: Colors.appColor,
  },
  icon: {
    marginRight: 10,
  },
});
