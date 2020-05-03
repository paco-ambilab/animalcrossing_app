import React from 'react';

import { Button, View, Text, Image } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Islands from './screens/Islands';
import IslandDetail from './screens/IslandDetail';
import Buys from './screens/Buys';
import BuyDetail from './screens/BuyDetail';

import User from './screens/User';
// import Favorites from './screens/Favorites';
// import Feedback from './screens/Feedback';

import colors from './utils/colors';

import ImageButton from  './components/ImageButton';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function IslandsScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  const handleHeaderRightOnPress = () => {
    navigation.navigate('User');
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>Islands</Text>,
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <ImageButton onPress={handleHeaderRightOnPress} imageSource={require('./assets/icon.png')}/>
        </View>
      ),
    });
  }, [navigation, route]);

  return (
    <Islands navigator={navigation}/>
  );
}

function IslandDetailScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  const handleHeaderRightOnPress = () => {
    navigation.navigate('User');
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>島嶼詳情</Text>,
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <ImageButton onPress={handleHeaderRightOnPress} imageSource={require('./assets/icon.png')}/>
        </View>
      ),
    });
  }, [navigation, route]);

  return (
    <IslandDetail/>
  );
}

function BuysScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  const handleHeaderRightOnPress = () => {
    navigation.push('User');
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>Buys</Text>,
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <ImageButton onPress={handleHeaderRightOnPress} imageSource={require('./assets/icon.png')}/>
        </View>
      ),
    });
  }, [navigation, route]);

  return (
    <Buys navigator={navigation}/>
  );
}

function BuyDetailScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  const handleHeaderRightOnPress = () => {
    navigation.navigate('User');
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>收購項目</Text>,
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <ImageButton onPress={handleHeaderRightOnPress} imageSource={require('./assets/icon.png')}/>
        </View>
      ),
    });
  }, [navigation, route]);



  return (
    <BuyDetail navigator={navigation}/>
  );
}

function UserScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>User</Text>,
      // headerRight: () => (
      //   <ImageButton onPress={() => {}} imageSource={require('./assets/icon.png')} />
      // ),
    });
  }, [navigation, route]);

  return (
    <User navigator={navigation}/>
  );
}

function Tabs() {
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '開放進島') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === '自由市場') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          labelStyle: {fontWeight: "bold"},
          activeTintColor: '#58B231',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="開放進島" component={IslandsScreen} />
        <Tab.Screen name="自由市場" component={BuysScreen} />
      </Tab.Navigator>
  );
}

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="IslandsTab" 
        component={Tabs} 
        options={{
          headerStyle: {
            // shadowOffset: { height: 0, width: 0 },
            // backgroundColor: '#FEF6E6',
          },
          headerTitleAlign: 'center',
          headerShown: true, 
          title: '聊聊動森',
          headerRight: () => {
            return (
              <View style={{marginRight: 10}}>
              <ImageButton onPress={() => {}} imageSource={require('./assets/icon.png')}/>
              </View>
            );
          }
        }}
        />
        <Stack.Screen name="IslandDetail" component={IslandDetailScreen} />
        <Stack.Screen name="BuyDetail" component={BuyDetailScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};