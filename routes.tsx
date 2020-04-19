import React from 'react';

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Islands from './screens/Islands';
import Buys from './screens/Buys';
import User from './screens/User';
import Favorites from './screens/Favorites';
import Feedback from './screens/Feedback';

import colors from './utils/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
	    <Tab.Screen name="Islands" component={Islands} />
	    <Tab.Screen name="Buys" component={Buys} />
	    <Tab.Screen name="Favorites" component={Favorites} />
	    <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};