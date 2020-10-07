/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AuthenticationScreen({navigation}) {
  function handleLoginPress() {
    navigation.navigate('AuthenticationStack', {screen: 'Login'});
  }

  function handleRegisterPress() {
    navigation.navigate('AuthenticationStack', {screen: 'Signup'});
  }

  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="emoticon-sad-outline"
        size={160}
        color="gray"
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          marginBottom: 60,
        }}>
        <Text style={{fontSize: 17, textAlign:'center'}}>
          Hey it seems like you don't have an account yet.
        </Text>
        <Text style={{textAlign: 'center', fontSize: 17}}>
          You can still browse without an account but you seriously have to
          create an account it's awesome.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={{color: '#4b9be0', fontSize: 16}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
          <Text style={{color: '#4b9be0', fontSize: 16}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    flexBasis: '40%',
    alignItems: 'center',
    borderRadius: 100,
  },
});

export default AuthenticationScreen;
