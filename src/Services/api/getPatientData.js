import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {AppContext} from '../../Components/AppContext';

export default function getPatientData() {
  firestore()
    .collection('Patients')
    .orderBy('date', 'desc')
    .onSnapshot(querySnapshot => {
      const patients = [];

      querySnapshot.forEach(documentSnapshot => {
        patients.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
    });
}
