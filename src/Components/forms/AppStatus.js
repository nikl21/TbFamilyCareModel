import React from 'react';
import {useFormikContext} from 'formik';
import ErrorMessage from './ErrorMessage';

export default function AppStatus({}) {
  const {status} = useFormikContext();
  //   console.log(status);
  return (
    <>
      <ErrorMessage error={status ? status : ''} touched={true} />
    </>
  );
}
