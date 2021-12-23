import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Username'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Password'),
});
export const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Username'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Password'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

export const PatientFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.number().required().positive().integer(),
});

export var categoryOptions = [
  {label: 'Presumtive TB Patient', value: 0},
  {label: 'Confirmed TB Patient', value: 1},
];
export var caregiverOptions = [
  {label: 'Presumtive TB Patient Caregiver', value: 0},
  {label: 'Confirmed TB Patient Caregiver', value: 1},
];
export var genderOptions = [
  {label: 'male', value: 0},
  {label: 'female', value: 1},
  {label: 'transgender', value: 2},
];
