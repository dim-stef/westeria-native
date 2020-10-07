/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/store';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from './src/components/Home';
import Authentication from './src/features/authentication/components/Authentication';
import SearchScreen from './src/components/SearchScreen';
import Splashscreen from './src/features/splashscreen/components/Splashscreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';
import {getUserData} from './src/features/authentication/authenticationSlices';
enableScreens();

const Stack = createSharedElementStackNavigator();
const Tab = createMaterialTopTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    background: '#ffffff',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

function Routes() {
  const {userData, loading, isAuth} = useSelector(
    (state) => state.authentication,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch, isAuth]);
  if (loading) {
    return <Splashscreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthenticationStack"
            component={Authentication}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function TabNavigator() {
  const {currentBranch, isAuth} = useSelector((state) => state.authentication);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      inactiveColor="black"
      activeColor="#03a9f4"
      barStyle={{backgroundColor: 'white', overflow: 'visible'}}
      tabBarOptions={{
        showIcon: true,
        activeTintColor: '#03a9f4',
        inactiveTintColor: 'black',
        showLabel: false,
        renderIndicator: () => null,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Authentication') {
            if (isAuth) {
              return (
                <Image
                  resizeMode="cover"
                  source={{uri: currentBranch.branch_image}}
                  style={{height: 24, width: 24, borderRadius: 100}}
                />
              );
            } else {
              return <AntDesign name={'user'} size={24} color={color} />;
            }
          } else if (route.name === 'Search') {
            iconName = 'search1';
          }

          return <AntDesign name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Authentication" component={Authentication} />
    </Tab.Navigator>
  );
}
export default App;
