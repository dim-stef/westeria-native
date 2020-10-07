/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {TextInput} from 'react-native-paper';
import WavyBackground from './WavyBackground';
import GradientBackground from './GradientBackground';
import {signUp} from '../authenticationSlices';

function Signup() {
  const {loading, isAuth} = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState([]);

  async function handlePress() {
    setErrors([]);
    dispatch(
      signUp({
        name: name,
        email: email,
        password1: password,
        password2: password2,
      }),
    )
      .then(unwrapResult)
      .then((result) => {
        // if token was not returned then registration failed
        if (!result.token) {
          setErrors(result);
        }
        console.log('Rer', result);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    console.log(isAuth);
  }, [loading, isAuth]);

  useEffect(() => {
    if (email && name && password && password2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, name, password, password2]);

  let errorArr = [];
  for (let key in errors) {
    errorArr.push(errors[key]);
  }

  // Errors are accessible as nested arrays of errors for each field.
  // We use flat to display them vertically.
  errorArr = errorArr.flat();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
        }}>
        <View
          style={{
            position: 'relative',
            width: '100%',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={require('../../../images/westeria_logo.png')}
              style={{width: 80, height: 80}}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
            color: 'black',
          }}>
          Sign up to Westeria
        </Text>
        <View style={{width: '80%', margin: 5}}>
          <TextInput
            label="Name"
            style={{backgroundColor: '#ffffff'}}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{width: '80%', margin: 5}}>
          <TextInput
            label="Email"
            style={{backgroundColor: '#ffffff'}}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{width: '80%', margin: 5}}>
          <TextInput
            secureTextEntry={true}
            autoCompleteType="password"
            label="Password"
            style={{backgroundColor: '#ffffff'}}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{width: '80%', margin: 5}}>
          <TextInput
            secureTextEntry={true}
            autoCompleteType="password"
            label="Password again"
            style={{backgroundColor: '#ffffff'}}
            onChangeText={(text) => setPassword2(text)}
          />
        </View>
        <View>
          {errorArr.map((e) => {
            return (
              <Text
                style={{
                  color: 'red',
                  marginTop: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: 'center',
                }}>
                {e}
              </Text>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handlePress}
          disabled={disabled}>
          {disabled ? null : <GradientBackground />}
          <View style={{position: 'absolute', left: 10}}>
            <ActivityIndicator size="large" color="white" animating={loading} />
          </View>
          <Text style={{color: 'white', fontSize: 18}}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: 'gray',
    width: 200,
    height: 60,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default Signup;
