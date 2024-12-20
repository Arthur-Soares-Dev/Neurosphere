import React from 'react';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

const NeuroSphereLogo = ({ width = 64, height = 75, style }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 51 62"
      fill="none"
      style={style} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M42.089 3.30027C42.9389 1.47758 45.1055 0.689007 46.9282 1.53894C48.7509 2.38888 49.5395 4.55546 48.6895 6.37815L43.4298 17.6577L36.8293 14.5798L42.089 3.30027Z" fill="#9FDE76"/>
      <Path d="M2.54773 6.3784C1.6978 4.55571 2.48637 2.38912 4.30906 1.53918C6.13175 0.689249 8.29834 1.47782 9.14827 3.30051L14.408 14.58L7.80745 17.6579L2.54773 6.3784Z" fill="#9FDE76"/>
      <Circle cx="25.2252" cy="30.7745" r="25.2252" fill="#9FDE76"/>
      <Ellipse cx="11.856" cy="30.0182" rx="3.78378" ry="1.76577" fill="#F76D8E"/>
      <Ellipse cx="39.0992" cy="30.0182" rx="3.78378" ry="1.76577" fill="#F76D8E"/>
      <Ellipse cx="36.5769" cy="23.9638" rx="2.27027" ry="7.31532" fill="#3B8AC4"/>
      <Ellipse cx="14.3787" cy="23.9638" rx="2.27027" ry="7.31532" fill="#3B8AC4"/>
      <Path d="M21.3214 56C19.4454 57.7644 17.1429 59 14.5313 59C9.81991 59 6 54.9688 6 50C6 45.0312 9.81991 41 14.5313 41C21.3214 41 25.5 50 25.5 50C25.5 50 29.6786 59 36.4688 59C41.1801 59 45 54.9688 45 50C45 45.0312 41.1801 41 36.4688 41C33.912 41 31.5363 42.2891 29.6786 44" stroke="#F76D8E" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round"/>
    </Svg>
  );
};

export default NeuroSphereLogo;
