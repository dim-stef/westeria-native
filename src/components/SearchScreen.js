import React from 'react';
import {View, SafeAreaView, Text, Dimensions} from 'react-native';
//import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import FeedList from './Feed';
import ProfileScreen from './ProfileScreen';
import Search from './Search';
//import Stack from './SharedStack';
const Stack = createSharedElementStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function SearchScreen({navigation}) {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
        }}>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={(route) => {
            const options = {
              title: '',
              cardStyle: {
                backgroundColor: '#ffffff',
              },
            };
            return options;
          }}
          sharedElements={(route, otherRoute, showing) => {
            const data = route.params;
            return [
              {
                id: `profile.search.${data.profile.id}`,
                animation: 'move',
              },
            ];
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            cardStyle: {
              backgroundColor: '#ffffff',
            },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default SearchScreen;
