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
import TakePicture from './scenes/TakePicture';

import Swiper from 'react-native-swiper';

export default class cunyplusplus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSplash: true,
      addingNew: false
    }
  }
  _changeIndex() {
    this.refs['swiper'].scrollBy(1)
  }
  _addNew() {
    this.setState({addingNew: true, addingPic: true}, () => {
      this.refs['swiper'].scrollBy(1)
    })
  }
  _closeReport() {
    this.setState({addingNew: false, addingPic: false})
  }
  _picture() {
    this.refs['swiper'].scrollBy(1)
  }
  _handlePic(data) {
    console.log(data);
    this.setState({addingPic: false})
  }
  render() {
    const {showSplash, addingNew, addingPic} = this.state;
    if (showSplash) {
      setTimeout(() => this.setState({showSplash: false}), 1000);
    }
    
    const screens = [
      <Chat key="chat" back={this._changeIndex.bind(this)}/>,
      <Report key="report" newReport={this._addNew.bind(this)}/>];

    if (addingNew)
      screens.push(<NewReport key="newReport" submit={this._closeReport.bind(this)} takePicture={this._picture.bind(this)}/>);
    if (addingPic)
      screens.push(<TakePicture key="picture" picture={this._handlePic.bind(this)}/>)
    return (
      this.state.showSplash? <Splash/>: 
      <Swiper
        ref={'swiper'}
        loop={false}
        showsPagination={false}
        index={1}>
        {screens}
      </Swiper>
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
