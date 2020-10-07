import React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class GradientBackground extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={['#0096da', '#cd56f5']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 100,
  },
});
export default GradientBackground;
