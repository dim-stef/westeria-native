/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

function PostListHeaderModal({isModalVisible, setModalVisible}) {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal
      style={{margin: 0, justifyContent: 'flex-end'}}
      swipeDirection="down"
      hideModalContentWhileAnimating
      onSwipeComplete={() => setModalVisible(false)}
      isVisible={isModalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            zIndex: 10,
            backgroundColor: 'white',
            width: '100%',
            minHeight: 200,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>I am the modal content!</Text>
        </View>
      </View>
    </Modal>
  );
}

export default PostListHeaderModal;
