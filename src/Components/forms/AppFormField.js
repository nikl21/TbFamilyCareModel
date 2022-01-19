import React from 'react';
import {useFormikContext} from 'formik';
import AppInput from '../AppInput';
import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';

export default function AppFormField({name, ...otherProps}) {
  const {setFieldTouched, handleChange, errors, touched, values} =
    useFormikContext();
  return (
    <>
      <FormInput
        onChangeText={handleChange(name)}
        value={values[name] && values[name].toString()}
        onBlur={() => {
          setFieldTouched(name);
        }}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} touched={touched[name]} />
    </>
  );
}
