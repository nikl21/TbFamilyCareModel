import axios from 'axios';
import Config from 'react-native-config';

const options = {
  baseURL: Config.BASE_URL,
  timeout: 1000,
};
export const axiosApi = axios.create(options);
