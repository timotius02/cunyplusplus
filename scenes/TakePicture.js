import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';
import Utils from '../utils';

export default class TakePicture extends Component{
	render(){
		return(
			<View>
				<Camera 
						ref={(cam) => { this.camera = cam}}
						style = { styles.preview }
						aspect = { Camera.constants.Aspect.fill }>
						<Text style = { styles.capture } onPress = { this.takePicture.bind(this) }>CAPTURE</Text>
				</Camera>
			</View>	
		)
	}
	
	takePicture(){
		this.camera.capture()
			.then((data) => console.log(data))
			.catch(err => console.error(err));
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Utils.DEVICE_HEIGHT,
    width: Utils.DEVICE_WIDTH,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = TakePicture;
