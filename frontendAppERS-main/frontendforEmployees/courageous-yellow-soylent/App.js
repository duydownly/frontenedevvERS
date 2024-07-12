import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/View/Login'; // Đảm bảo đường dẫn này là chính xác
import Home from './src/View/Home/Home'; // Đảm bảo đường dẫn này là chính xác

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
