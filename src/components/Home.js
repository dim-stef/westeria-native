import React, {useEffect} from 'react';
import {View, SafeAreaView, Text, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import PostList from './PostList';
import FeedList from './Feed';
import PostScreen from '../features/posts/components/PostScreen';
import MediaScreen from './MediaScreen';
import ProfileScreen from './ProfileScreen';
import {TransitionPresets} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {
  login,
  checkForToken,
} from '../features/authentication/authenticationSlices';

const Stack = createSharedElementStackNavigator();
//const Stack = createStackNavigator();
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

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

function Home({navigation}) {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{
          gestureEnabled: true,
          cardOverlayEnabled: true,

          ...TransitionPresets.SlideFromRightIOS,
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
        }}>
        <Stack.Screen
          name="Feed"
          component={FeedList}
          options={{
            cardStyle: {
              backgroundColor: '#ffffff',
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            title: 'Comments',
            cardStyle: {
              backgroundColor: '#ffffff',
            },
          }}
          /*sharedElements={(route, otherRoute, showing) => {
            const data = route.params;
            return [
              {
                id: `item.${data.post.id}`,
                animation: 'move',
                resize: 'auto',
              },
              {
                id: `item.${data.post.id}.text`,
                animation: 'fade',
                resize: 'clip',
              },
              {
                id: `item.${data.post.id}.poster_name`,
                animation: 'move',
                resize: 'clip',
              },
              {
                id: `item.${data.post.id}.image`,
                animation: 'move',
              },
              {
                id: `profile.${data.post.poster_full.id}.${data.post.id}`,
                animation: 'move',
                resize: 'auto',
              },
            ];
          }}*/
        />
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
                id: `profile.${data.profile.id}.${data.post.id}`,
                animation: 'move',
              },
            ];
          }}
        />
        <Stack.Screen
          name="MediaScreen"
          component={MediaScreen}
          options={{
            cardStyle: {
              backgroundColor: '#ffffff',
            },
          }}
          sharedElements={(route, otherRoute, showing) => {
            const data = route.params;
            return [
              {
                id: `item.${data.post.id}`,
                animation: 'move',
              },
            ];
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default Home;
