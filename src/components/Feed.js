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
} from 'react-native';
import HTML from 'react-native-render-html';
import {SharedElement} from 'react-navigation-shared-element';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Post from '../features/posts/components/Post';
import PostList from './PostList';

function FeedList({navigation, route}) {
  return (
    <View>
      <PostList navigation={navigation} modalOptions={[]} />
    </View>
  );
}

export default FeedList;
