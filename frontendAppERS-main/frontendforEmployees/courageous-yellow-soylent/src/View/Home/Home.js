import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Attendance from './Attendance';
import MonthScreen from './MonthScreen';
import AccountScreen from './Account';
import styles from './styles';

const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Day"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'clipboard-check'; // Chấm công icon
          } else if (route.name === 'Month') {
            iconName = 'calendar-month'; // Tháng icon
          } else if (route.name === 'Account') {
            iconName = 'account-circle'; // Tài khoản icon
          } else {
            iconName = 'calendar-today'; // Default calendar icon
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="Home" component={Attendance} options={{ tabBarLabel: 'Chấm công', headerShown: false }} />
      <Tab.Screen name="Month" component={MonthScreen} options={{ tabBarLabel: 'Tháng', headerShown: false }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarLabel: 'Tài khoản', headerShown: false }} />
    </Tab.Navigator>
  );
}
