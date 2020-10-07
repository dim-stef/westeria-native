/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';
import HTML from 'react-native-render-html';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SharedElement} from 'react-navigation-shared-element';
import Modal from 'react-native-modal';
import Post from '../features/posts/components/Post';
import PostListHeaderModal from './PostListHeaderModal';
import Config from 'react-native-config';

function PostList({
  navigation,
  url = `${Config.API_URL}/posts/all/`,
  modalOptions,
  skeletonCount = 4,
  ListHeaderComponent = null,
}) {
  const _animatedValue = useRef(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const videoRefs = useRef([]);
  const onViewRef = React.useRef(({viewableItems, changed}) => {
    console.log(viewableItems, changed, videoRefs.current);
    for (const changedItem of changed) {
      if (changedItem.isViewable) {
        videoRefs.current.find((v) => {
          if (v.post.id == changedItem.item.id) {
            v.setPaused(false);
            console.log('resume')
          }else{
            console.log('paused')

            v.setPaused(true);
          }
        });
      }
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const [posts, setPosts] = useState(null);
  const [next, setNext] = useState(null);

  const renderItem = ({item}) => {
    return (
      <View>
        <SharedElement id={`item.${item.id}`}>
          <Post post={item} navigation={navigation} videoRefs={videoRefs} />
        </SharedElement>
      </View>
    );
  };

  async function getPosts() {
    try {
      let response = await fetch(next ? next : url);
      let data = await response.json();
      setNext(data.next);
      if (posts) {
        setPosts([...posts, ...data.results]);
      } else {
        setPosts(data.results);
      }
    } catch (e) {}
  }

  function onEndReached() {
    getPosts();
  }

  function handleScroll(e) {
    if (e.nativeEvent.contentOffset.y != 0) {
      navigation.setOptions({title: 'Updated!'});
    } else {
      navigation.setOptions({title: ''});
    }
    console.log(e.nativeEvent.contentOffset.y);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
      }}>
      <PostListHeaderModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <FlatList
        onScroll={handleScroll}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        windowSize={10}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
            <Header setModalVisible={setModalVisible} />
          </>
        }
        ListFooterComponent={<ListSkeleton skeletonCount={skeletonCount} />}
        onEndReached={onEndReached}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

function Header({setModalVisible}) {
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          margin: 20,
          alignSelf: 'flex-start',
        }}>
        Everything
      </Text>
    </TouchableOpacity>
  );
}

function ListSkeleton({skeletonCount = 4}) {
  return (
    <ScrollView>
      {[...Array(skeletonCount)].map((item, i) => {
        return <ListSkeletonItem />;
      })}
    </ScrollView>
  );
}

function ListSkeletonItem() {
  return (
    <SkeletonPlaceholder>
      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            width: '100%',
          }}>
          <View style={{width: 48, height: 48, borderRadius: 50}} />
          <View
            style={{width: 100, height: 20, marginLeft: 10, borderRadius: 4}}
          />
        </View>
        <View style={{height: 300, width: '100%'}} />
      </View>
    </SkeletonPlaceholder>
  );
}

export default PostList;
