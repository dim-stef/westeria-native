/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-render-html';
import {SharedElement} from 'react-navigation-shared-element';
import Post from './Post';
import ReplyTree from './Comments';
import Config from 'react-native-config';
import axios from 'axios';

function PostScreen({navigation, route}) {
  const post = route.params.post;
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [next, setNext] = useState(null);
  const fetchData = async () => {
    if (!hasMore) {
      return;
    }

    let uri = next ? next : `${Config.API_URL}/post/${post.id}/replies/`;
    let response = await axios.get(uri);

    if (!response.data.next) {
      setHasMore(false);
    }

    setNext(response.data.next);
    setComments([...comments, ...response.data.results]);
  };

  const renderItem = ({item}) => (
    <ReplyTree post={item} topLevelPost={post} navigation={navigation} />
  );

  const listHeaderComponent = () => {
    return (
      <>
        <SharedElement id={`item.${post.id}`}>
          <Post
            standAlone
            post={post}
            topLevelPost={post}
            navigation={navigation}
          />
        </SharedElement>
      </>
    );
  };

  const listFooterComponent = () => {
    if (hasMore) {
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <ActivityIndicator size="large" color="blue" animating={true} />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex:1, backgroundColor:'red', width:'100%', height:'100%'}}>
      <FlatList
        onEndReached={fetchData}
        data={comments}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default PostScreen;
