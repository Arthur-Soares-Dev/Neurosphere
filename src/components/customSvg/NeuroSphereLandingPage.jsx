import React from 'react';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';

const NeuroSphereLandingPage = ({ width = 427, height = 366, style }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 427 366"
      fill="none"
      style={style} // Aplicando o estilo recebido
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M85.7351 56.9252C78.1494 40.6577 85.1875 21.3208 101.455 13.7351V13.7351C117.723 6.14944 137.059 13.1875 144.645 29.455L194.303 135.946L135.393 163.416L85.7351 56.9252Z" fill="#9FDE76"/>
      <Ellipse cx="91.5" cy="222.5" rx="91.5" ry="95.5" fill="#F76D8E"/>
      <Ellipse cx="335.5" cy="222.5" rx="91.5" ry="95.5" fill="#F76D8E"/>
      <Circle cx="222" cy="216" r="150" fill="#9FDE76"/>
      <Path d="M299.657 29.455C307.243 13.1875 326.58 6.14941 342.848 13.7351V13.7351C359.115 21.3208 366.153 40.6576 358.567 56.9252L308.91 163.416L250 135.946L299.657 29.455Z" fill="#9FDE76"/>
      <Ellipse cx="295.5" cy="179.5" rx="20.5" ry="7.5" fill="#F76D8E"/>
      <Ellipse cx="153.5" cy="179.5" rx="20.5" ry="7.5" fill="#F76D8E"/>
      <Ellipse cx="283.5" cy="154" rx="12.5" ry="30" fill="#3B8AC4"/>
      <Ellipse cx="165.5" cy="154" rx="12.5" ry="30" fill="#3B8AC4"/>
    </Svg>
  );
};

export default NeuroSphereLandingPage;
