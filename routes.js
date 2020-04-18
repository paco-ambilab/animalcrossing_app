import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import Islands from './screens/Islands';
import Buys from './screens/Buys';
import User from './screens/User';
import Favorites from './screens/Favorites';
import Feedback from './screens/Feedback';

import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

// const IslandsScreens = StackNavigator(
//   {
//     Islands: {
//       screen: Islands,
//     },
//   },
//   {
//     initialRouteName: 'Islands',
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon('list'),
//     },
//   },
// );

const BuysScreens = StackNavigator(
  {
    Buys: {
      screen: Buys,
    },
  },
  {
    initialRouteName: 'Buys',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('list'),
    },
  },
);

// const FavoritesScreens = StackNavigator(
//   {
//     Favorites: {
//       screen: Favorites,
//     },
//   },
//   {
//     initialRouteName: 'Favorites',
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon('star'),
//     },
//   },
// );

// const UserScreens = StackNavigator(
//   {
//     User: {
//       screen: User,
//     },
//   },
//   {
//     mode: 'modal',
//     initialRouteName: 'User',
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon('person'),
//     },
//   },
// );

export default TabNavigator(
  {
    // Islands: {
    //   screen: IslandsScreens,
    // },
    Buys: {
      screen: BuysScreens,
    },
    // Favorites: {
    //   screen: FavoritesScreens,
    // },
    // User: {
    //   screen: UserScreens,
    // },
  },
  {
    initialRouteName: 'Buys',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
      renderIndicator: () => null,
    },
  },
);