import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ProtectedScreen from '../screens/ProtectedScreen';
import {AuthContext} from '../context/AuthContext';

const Stack = createStackNavigator();

function Navigator() {
  const {status} = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      )}
    </Stack.Navigator>
  );
}

export default Navigator;
