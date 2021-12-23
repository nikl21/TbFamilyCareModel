import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>;
};
