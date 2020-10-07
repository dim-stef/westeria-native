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

function ProfileScreen({navigation, profile = null, route}) {
  const _profile = profile ? profile : route.params.profile;
  const post = route && route.params ? route.params.post : null;
  return (
    <View>
      <PostList
        navigation={navigation}
        ListHeaderComponent={<ProfileHeader profile={_profile} post={post} />}
      />
    </View>
  );
}

function ProfileHeader({profile, post}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <SharedElement
          id={
            post
              ? `profile.${profile.id}.${post.id}`
              : `profile.search.${profile.id}`
          }>
          <Image
            resizeMode="cover"
            source={{
              uri: profile.branch_image,
            }}
            style={{height: 100, width: 100, borderRadius: 100}}
          />
        </SharedElement>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 26, fontWeight: 'bold'}}>{profile.name}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'gray'}}>
            @{profile.name}
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <AntDesign
            name={profile.branch_type == 'CM' ? 'addusergroup' : 'adduser'}
            size={24}
          />
          <Text style={{fontWeight: 'bold', fontSize: 17}}>Follow</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 15,
            height: 100,
            width: Dimensions.get('screen').width - 20,
            margin: 20,
            backgroundColor: '#f8f8fb',
          }}>
          <View style={styles.mainButtonsWrapper}>
            <Text style={styles.mainButtonsPrimaryText}>
              {profile.followers_count}
            </Text>
            <Text style={styles.mainButtonsSecondaryText}>Followers</Text>
          </View>
          <View style={styles.mainButtonsWrapper}>
            <Text style={styles.mainButtonsPrimaryText}>
              {profile.following_count}
            </Text>
            <Text style={styles.mainButtonsSecondaryText}>Following</Text>
          </View>
          <View style={styles.mainButtonsWrapper}>
            <Text style={styles.mainButtonsPrimaryText}>
              {profile.branch_count}
            </Text>
            <Text style={styles.mainButtonsSecondaryText}>Similar</Text>
          </View>
        </View>
        <Text style={{color: '#5c5b63', margin: 20}}>
          Donec feugiat nisi eleifend, consequat dolor vel, ornare enim. Nam nec
          molestie neque. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainButtonsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonsPrimaryText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  mainButtonsSecondaryText: {
    fontSize: 16,
    color: '#797882',
    fontWeight: 'bold',
  },
  addButton: {
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

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

export default ProfileScreen;
