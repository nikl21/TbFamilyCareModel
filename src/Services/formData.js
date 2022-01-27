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
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Username'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Password'),
  passwordConfirmation: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Password'),
  facility_name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .label('Facility Name'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
    .label('Cho Name'),
});

export const ProfileSchema = Yup.object().shape({
  // name: Yup.string().required('Required').label('Fullname'),
  phone: Yup.string().length(10),
});
export const PatientFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.number().required().integer().max(120).min(0).label('Age'),

  phone: Yup.string()
    .required()
    .test('len', 'Must be exactly 10 characters', val =>
      val ? val.length === 10 : true,
    ),
});

export var categoryOptions = [
  {label: 'Presumptive ', value: 0},
  {label: 'Confirmed ', value: 1},
];
export var caregiverOptions = [
  {label: 'Presumptive', value: 0},
  {label: 'Confirmed ', value: 1},
  {label: 'Negative', value: 2},
];
export var testOptions = [
  {label: 'Tested Positive', value: 0},
  {label: 'Tested Negative', value: 1},
];
export var genderOptions = [
  {label: 'male', value: 0},
  {label: 'female', value: 1},
  {label: 'transgender', value: 2},
];
export var sampleOptions = [
  {label: 'collected', value: 0},
  {label: 'not collected', value: 1},
];
export var dmcOptions = [
  {label: 'sent', value: 0},
  {label: 'not sent', value: 1},
];
export var cupOptions = [
  {label: 'provided', value: 0},
  {label: 'not provided', value: 1},
];
export var morningSampleOptions = [
  {label: 'sample sent', value: 0},
  {label: 'sample not sent', value: 1},
];

export var relationOptions = [
  {label: 'Spouse', value: 0},
  {label: 'Parent', value: 1},
  {label: 'Sibling', value: 2},
  {label: 'Friend', value: 3},
  {label: 'Other', value: 4},
];
export var trackerOptions = [
  {label: 'Received', value: 0},
  {label: 'Not Received', value: 1},
];
export var trackerWeekOptions = [
  {label: 'Yes', value: 0},
  {label: 'No', value: 1},
];
export var npyOptions = [
  {label: 'Yes', value: 0},
  {label: 'No', value: 1},
];
