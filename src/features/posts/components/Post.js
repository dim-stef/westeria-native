/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import HTML from 'react-native-render-html';
import Video from 'react-native-video';
import Toolbar from '../../toolbar/components/Toolbar';

const Post = React.memo(
  ({
    post,
    topLevelPost,
    videoRefs,
    standAlone = false,
    isComment = false,
    commentSettings = {},
  }) => {
    const navigation = useNavigation();
    const combineStyles = StyleSheet.flatten([
      styles.post,
      standAlone
        ? styles.standAlonePost
        : isComment
        ? [styles.comment, commentSettings]
        : {},
    ]);
    function handlePress() {
      if (standAlone || isComment) {
        //navigation.push('PostScreen', {post: post});
      } else {
        navigation.push('PostScreen', {post: post});
      }
    }

    function handleProfilePress() {
      navigation.push('ProfileScreen', {
        profile: post.poster_full,
        post: post,
      });
      /*navigation.navigate('Search', {
      screen: 'ProfileScreen',
      initial: false,
      params: {
        profile: post.poster_full,
        post: post,
      },
    });*/
    }

    return (
      <>
        <View style={{...combineStyles}}>
          <TouchableNativeFeedback onPress={handlePress}>
            <View>
              <View style={{padding: 10}}>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={handleProfilePress}>
                    <SharedElement
                      id={`profile.${post.poster_full.id}.${post.id}`}>
                      <Image
                        resizeMode="cover"
                        source={{
                          uri: post.poster_full.branch_image,
                        }}
                        style={{height: 40, width: 40, borderRadius: 100}}
                      />
                    </SharedElement>
                  </TouchableOpacity>

                  <SharedElement id={`item.${post.id}.poster_name`}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        marginLeft: 10,
                        fontSize: 16,
                      }}>
                      {post.poster_full.name}
                    </Text>
                  </SharedElement>
                </View>

                <SharedElement id={`item.${post.id}.text`}>
                  <HTML html={post.text_html || post.text} />
                </SharedElement>
              </View>
              {post.images.length > 0 ? (
                <Images
                  images={post.images}
                  post={post}
                  standAlone={standAlone}
                />
              ) : null}
              {post.videos.length > 0 ? (
                <Videos
                  videos={post.videos}
                  videoRefs={videoRefs}
                  post={post}
                />
              ) : null}
            </View>
          </TouchableNativeFeedback>
          {standAlone ? null : <Toolbar post={post}/>}
        </View>
      </>
    );
  },
  () => {
    return true;
  },
);

function Images({images, post, standAlone}) {
  const win = Dimensions.get('window');
  const ratio = win.width / images[0].width;

  const combineStyles = StyleSheet.flatten([
    {width: '100%', height: images[0].height * ratio},
    standAlone ? styles.standAloneImage : styles.image,
  ]);

  return (
    <SharedElement id={`item.${post.id}.image`}>
      <FastImage
        source={{
          uri: images[0].image,
        }}
        style={combineStyles}
        resizeMode={FastImage.resizeMode.cover}
      />
    </SharedElement>
  );
}

function Videos({videos, post, videoRefs}) {
  const [paused, setPaused] = useState(true);
  const win = Dimensions.get('window');
  const ratio = win.width / videos[0].width;

  const player = useRef(null);

  return (
    <Video
      resizeMode="cover"
      muted
      paused={paused}
      source={{uri: videos[0].video}} // Can be a URL or a local file.
      ref={(ref) => {
        player.current = ref;
        if (videoRefs && videoRefs.current) {
          videoRefs.current.push({
            ref: ref,
            post: post,
            setPaused: setPaused,
          });
        }
      }}
      style={{
        width: '100%',
        height: videos[0].height * ratio,
      }}
    />
  );
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
    overflow: 'hidden',
    //width: '100%',//Dimensions.get('screen').width - 20,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  standAlonePost: {
    margin: 0,
    marginTop: 10,
    width: Dimensions.get('screen').width,
    borderRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },
  comment: {
    borderLeftWidth: 3,
    borderLeftColor: '#e2eaf1',
    marginTop: 10,
    borderRadius: 0,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },
  image: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  standAloneImage: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  backgroundVideo: {
    height: 200,
    width: '100%',
  },
});

export default Post;
