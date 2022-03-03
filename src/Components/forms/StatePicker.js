import {useFormikContext} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {axiosApi} from '../../Services/api/axiosApi';
import {AppContext} from '../AppContext';
import AppInput from '../AppInput';
import FormInput from './FormInput';
import AppRadioButton from './RadioButton';

export default function StatePicker({name, token, stateName}) {
  const {values} = useFormikContext();
  const {stateData, setStateData} = useContext(AppContext);
  const [isVisible, setVisible] = useState(false);

  function getSampleOptions(data, key) {
    return data[key].map(item => ({label: item.name, value: item.id}));
  }
  function getBlockOptions(data) {
    return data.map(item => ({label: item.name, value: item.id}));
  }

  useEffect(() => {
    let isMounted = true;
    token &&
      axiosApi
        .get('/static_values.json', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(data => {
          if (isMounted) {
            setStateData(data.data);
          }
        })
        .catch(error => console.log('err', error));
    return () => {
      isMounted = false;
    };
  }, [setStateData, token]);

  return (
    <View>
      {stateData && (
        <>
          <Pressable
            onPress={
              () => {}
              // setVisible(!isVisible)
            }>
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
              radio_props={getSampleOptions(stateData, 'states')}
              name={name}
              isHorizontal={false}
              isState={true}
            />
          )}
          {values.state_id !== '' && (
            <AppRadioButton
              label={'Disitricts'}
              radio_props={getBlockOptions(
                stateData.districts.filter(
                  item => item.id === 18 || item.id === 26,
                ),
              )}
              name={'district_id'}
              isHorizontal={false}
              isState={true}
            />
          )}
          {values.district_id !== '' && (
            <AppRadioButton
              label={'Blocks'}
              radio_props={getBlockOptions(
                stateData.blocks.filter(
                  item => item.district_id === values.district_id,
                ),
              )}
              name={'block_id'}
              isHorizontal={false}
              isState={true}
            />
          )}
        </>
      )}
    </View>
  );
}
