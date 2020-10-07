import React, {useEffect} from 'react';
import {View, SafeAreaView, Text, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ProfileScreen from '../../../components/ProfileScreen';
import PostScreen from '../../posts/components/PostScreen';
import Login from './Login';
import Signup from './Signup';
import AuthenticationScreen from './AuthenticationScreen';
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

function Authentication({navigation}) {
  const {currentBranch} = useSelector((state) => state.authentication);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Stack.Navigator
        initialRouteName="AuthenticationScreen"
        screenOptions={{
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
        }}>
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            cardStyle: {
              backgroundColor: '#ffffff',
            },
          }}
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
          name="AuthenticationScreen"
          component={ProfileScreenComponent}
          options={{
            cardStyle: {
              backgroundColor: '#ffffff',
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '',
            cardStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTransparent: true,
            title: '',
            cardStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

function ProfileScreenComponent({navigation}) {
  const {currentBranch} = useSelector((state) => state.authentication);

  if (currentBranch) {
    return <ProfileScreen navigation={navigation} profile={currentBranch} />;
  } else {
    return <AuthenticationScreen navigation={navigation} />;
  }
}
export default Authentication;
