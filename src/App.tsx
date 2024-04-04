/* eslint-disable @typescript-eslint/no-unused-vars */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignupScreen} from './Shared';
import Rootstore from './Shared/Stores/Root.store';
import {Provider, observer} from 'mobx-react';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider {...Rootstore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
