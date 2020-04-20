import React from 'react';

import { Button, View, Text, Image } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Islands from './screens/Islands';
import Buys from './screens/Buys';
// import User from './screens/User';
// import Favorites from './screens/Favorites';
// import Feedback from './screens/Feedback';

import colors from './utils/colors';

import ImageButton from  './components/ImageButton';

const Stack = createStackNavigator();

function IslandsScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>Islands</Text>,
      headerRight: () => (
        <ImageButton onPress={() => {}} imageSource={require('./assets/icon.png')} />
      ),
    });
  }, [navigation, setCount]);

  return (
    <Islands />
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Islands"
        component={IslandsScreen}
        options={{}}
      />
    </Stack.Navigator>
  );
}



const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Islands') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Buys') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
	    <Tab.Screen name="Islands" component={StackScreen} />
	    <Tab.Screen name="Buys" component={Buys} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};