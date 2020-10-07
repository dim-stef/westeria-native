import React from 'react';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default function WavyBackground({customStyles}) {
  return (
    <View style={customStyles}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <Path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,128L40,117.3C80,107,160,85,240,112C320,139,400,213,480,202.7C560,192,640,96,720,101.3C800,107,880,213,960,256C1040,299,1120,277,1200,266.7C1280,256,1360,256,1400,256L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </Svg>
    </View>
  );
}
