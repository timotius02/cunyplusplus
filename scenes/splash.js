import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';

import Utils from '../utils/';

export default class Splash extends Component {
  render() {
    return (
      <Image source={require('../img/blue-nyc.png')} style={styles.backgroundImage}> 

        <Image source={require('../img/logo.png')} style={styles.logo}/>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    marginTop: Utils.HEIGHT_UNIT * 6
  },
  backgroundImage: {
    alignItems: 'center'
  
  }
});