/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Splash from './scenes/splash';
import Report from './scenes/report';
import Chat from './scenes/chat';
import NewReport from './scenes/NewReport';

import Swiper from 'react-native-swiper';

export default class cunyplusplus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSplash: true,
      index: 1,
      autoPlay: false
    }
  }
  _changeIndex() {
    this.refs['swiper'].scrollBy(1)
  }
  render() {
    const { index, showSplash } = this.state;
    if (showSplash) {
      setTimeout(() => this.setState({showSplash: false}), 1000);
    }

    return (
      <NewReport/>
    )


  }
}

var test = "hello";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('cunyplusplus', () => cunyplusplus);
