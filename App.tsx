import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';

interface PropsState {
  children: JSX.Element | JSX.Element[]
}

const AppState = ({children}:PropsState)=>{
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>{/* Rest of your app code */}
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App
