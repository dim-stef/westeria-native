/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableNativeFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useReactActions} from './PostActions';
import {useDispatch, useSelector} from 'react-redux';

function Toolbar({post}) {
  const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);
  const navigation = useNavigation();

  const [
    react,
    starCount,
    dislikeCount,
    isDisabled,
    changeReact,
    createOrDeleteReact,
  ] = useReactActions(post);
  function handleCommentClick() {
    navigation.push('PostScreen', {post: post});
  }
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <TouchableNativeFeedback onPress={handleCommentClick}>
        <View style={styles.button}>
          <FontAwesome name="comment-o" size={20} color="black" />
          <Text style={{transform: [{translateX: 10}]}}>
            {post.replies_count}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <Star
        react={react}
        starCount={starCount}
        changeReact={changeReact}
        createOrDeleteReact={createOrDeleteReact}
      />
      <TouchableNativeFeedback>
        <View style={styles.button}>
          <View
            style={{
              padding: 10,
              borderRadius: 100,
              backgroundColor: react == 'dislike' ? '#3333ff' : 'transparent',
            }}>
            <FontAwesome
              name={react == 'dislike' ? 'thumbs-down' : 'thumbs-o-down'}
              size={20}
              color={react == 'dislike' ? 'white' : 'black'}
            />
          </View>
          <Text style={{transform: [{translateX: 10}]}}>{dislikeCount}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

function Star({react, starCount, changeReact, createOrDeleteReact}) {
  const {isAuth} = useSelector((state) => state.authentication);

  const [reacted, setReacted] = useState(false);

  const onClick = () => {
    if (isAuth) {
      handleLikeClick();
    } else {
      //history.push('/login');
    }
  };

  useLayoutEffect(() => {
    if (react == 'star') {
      setReacted(true);
    } else {
      setReacted(false);
    }
  }, [react]);

  function handleLikeClick() {
    if (react && react != 'star') {
      changeReact('star');
    } else {
      createOrDeleteReact('star');
    }
  }

  return (
    <TouchableNativeFeedback onPress={onClick}>
      <View style={{...styles.button}}>
        <View
          style={{
            padding: 10,
            borderRadius: 100,
            backgroundColor: react == 'star' ? '#ff3333' : 'transparent',
          }}>
          <AntDesign
            name={react == 'star' ? 'star' : 'staro'}
            size={20}
            color={react == 'star' ? 'white' : 'black'}
          />
        </View>
        <Text style={{transform: [{translateX: 10}]}}>{starCount}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    alignSelf: 'stretch',
  },
});
export default Toolbar;
