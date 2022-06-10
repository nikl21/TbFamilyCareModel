import * as Yup from 'yup';
import i18n from '../Translations';

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
  name: Yup.string().required('Required').label('Fullname'),
  phone: Yup.string().length(10),
  facility_name: Yup.string().test(
    'len',
    'Must be less than 40 characters',
    val => val.length < 40,
  ),
});
export const PatientFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  age: Yup.number().required().integer().max(120).min(0).label('Age'),

  phone: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Please enter a valid phone number',
    )
    .required()
    .test('len', 'Must be exactly 10 characters', val =>
      val ? val.length === 10 : true,
    ),
});

export var categoryOptions = [
  {label: i18n.t('addPatient.presumptive'), value: 0},
  {label: i18n.t('addPatient.confirmed'), value: 1},
];
export var caregiverOptions = [
  {label: i18n.t('addPatient.presumptive'), value: 0},
  {label: i18n.t('addPatient.confirmed'), value: 1},
  {label: i18n.t('addPatient.negative'), value: 2},
];
export var testOptions = [
  {label: i18n.t('addPatient.positive'), value: 0},
  {label: i18n.t('addPatient.negative'), value: 1},
];
export var genderOptions = [
  {label: i18n.t('addPatient.male'), value: 0},
  {label: i18n.t('addPatient.female'), value: 1},
  {label: i18n.t('addPatient.transgender'), value: 2},
];
export var sampleOptions = [
  {label: i18n.t('addPatient.collected'), value: 0},
  {label: i18n.t('addPatient.notCollected'), value: 1},
];
export var dmcOptions = [
  {label: i18n.t('addPatient.sent'), value: 0},
  {label: i18n.t('addPatient.notSent'), value: 1},
];
export var cupOptions = [
  {label: i18n.t('addPatient.provided'), value: 0},
  {label: i18n.t('addPatient.notProvided'), value: 1},
];
export var morningSampleOptions = [
  {label: i18n.t('addPatient.morningSampleSent'), value: 0},
  {label: i18n.t('addPatient.sampleNotSent'), value: 1},
];

export var relationOptions = [
  {label: i18n.t('addPatient.spouse'), value: 0},
  {label: i18n.t('addPatient.parent'), value: 1},
  {label: i18n.t('addPatient.sibling'), value: 2},
  {label: i18n.t('addPatient.friend'), value: 3},
  {label: i18n.t('addPatient.other'), value: 4},
];
export var trackerOptions = [
  {label: i18n.t('addPatient.received'), value: 0},
  {label: i18n.t('addPatient.notReceived'), value: 1},
];
export var trackerWeekOptions = [
  {label: i18n.t('addPatient.yes'), value: 0},
  {label: i18n.t('addPatient.no'), value: 1},
];
export var npyOptions = [
  {label: i18n.t('addPatient.yes'), value: 0},
  {label: i18n.t('addPatient.no'), value: 1},
];
export var patientTypeOptions = [
  {label: i18n.t('addPatient.drugSensitive'), value: 0},
  {label: i18n.t('addPatient.drugResistantTb'), value: 1},
];

export var drugReactionOptions = [
  {label: i18n.t('addPatient.yes'), value: 0},
  {label: i18n.t('addPatient.no'), value: 1},
];
export var actionOptions = [
  {label: 'Counseling', value: 0},
  {label: 'Refer to higher health center', value: 1},
  {label: 'Other', value: 2},
];
export var medicationOptions = [
  {label: 'Yes', value: 0},
  {label: 'No', value: 1},
];
