import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token').then(value => {
      console.log('token from axios', value);
    });
    return value;
  } catch (e) {
    // error reading value
  }
};
