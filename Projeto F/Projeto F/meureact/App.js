import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetScreen from './get'; // Importe o componente da tela "Get"
import create from './create'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Create" component={create} />
        <Stack.Screen name="Get" component={GetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
