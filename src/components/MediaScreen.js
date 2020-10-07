/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HTML from 'react-native-render-html';
import {SharedElement} from 'react-navigation-shared-element';

function MediaScreen({navigation, route}) {
  const post = route.params.post;
  return (
    <View>
      <SharedElement id={`item.${post.id}`}>
        <Image
          source={{
            uri: post.images[0].image,
          }}
          style={{width:'100%'}}
        />
      </SharedElement>
    </View>
  );
}

export default MediaScreen;
