import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {axiosApi} from '../../Services/api/axiosApi';
import {AppContext} from '../AppContext';
import AppInput from '../AppInput';
import FormInput from './FormInput';
import AppRadioButton from './RadioButton';

export default function StatePicker({name, token, stateName}) {
  const {stateData, setStateData} = useContext(AppContext);
  const [isVisible, setVisible] = useState(false);
  function getSampleOptions(data) {
    return data.map(state => ({label: state.name, value: state.id}));
  }

  useEffect(() => {
    axiosApi
      .get('/states.json', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(data => {
        console.log(data.data);
        setStateData(data.data);
      })
      .catch(error => console.log(error));
  }, [setStateData, token]);

  return (
    <View>
      {stateData && (
        <>
          <Pressable onPress={() => setVisible(!isVisible)}>
            <View pointerEvents="none">
              <FormInput
                label={'Select State'}
                editable={false}
                value={stateName}
              />
            </View>
          </Pressable>
          {isVisible && (
            <AppRadioButton
              label={'State'}
              radio_props={getSampleOptions(stateData)}
              name={name}
              isHorizontal={false}
              isState={true}
            />
          )}
        </>
      )}
    </View>
  );
}
