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

function Splashscreen() {
  return (
    <SafeAreaView
      style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../../images/westeria_logo.png')}
        style={{width: 80, height: 80}}
      />
    </SafeAreaView>
  );
}

export default Splashscreen;
