/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Animated, Easing, Dimensions} from 'react-native';
import Config from 'react-native-config';
import Post from './Post';
import axios from 'axios';

function ReplyTree({post, topLevelPost}) {
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [next, setNext] = useState(null);
  const animatedValue = useRef(new Animated.Value(0));
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

  function animate() {
    animatedValue.current.setValue(0);
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }

  useEffect(() => {
    animate();
    fetchData();
  }, []);

  let borderColor = 'transparent';
  let left = 0;
  let width = Dimensions.get('screen').width;
  if (post.level - 1 == topLevelPost.level) {
    left = 0;
  } else {
    left = 15;
    // Set appropriate width so it doesn't overflow screen
    width =
      Dimensions.get('screen').width -
      (post.level - topLevelPost.level - 1) * 15;
    borderColor = '#e2eaf1';
  }

  const spaceLeftValue = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, left],
  });

  const translateX = {
    transform: [{translateX: spaceLeftValue}],
  };
  return (
    <Animated.View style={[translateX, {width: width}]}>
      <Post
        post={post}
        topLevelPost={topLevelPost}
        isComment
        commentSettings={{borderColor: borderColor}}
      />
      {comments.map((c, i) => {
        return (
          <React.Fragment key={i}>
            <ReplyTree post={c} topLevelPost={topLevelPost} />
          </React.Fragment>
        );
      })}
    </Animated.View>
  );
}

export default ReplyTree;
