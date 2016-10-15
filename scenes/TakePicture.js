import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Camera from 'react-native-camera';
import Utils from '../utils';

export default class TakePicture extends Component{
  takePicture(){
    this.camera.capture()
      .then((data) => this.props.picture(data))
      .catch(err => console.error(err));
  }
	render(){
		return(
			<View>
				<Camera 
						ref={(cam) => { this.camera = cam}}
						style={ styles.preview }
						aspect={ Camera.constants.Aspect.fill }>
            <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}>
              <Image source={require('../img/cameraButton.png')} />
            </TouchableOpacity>
						
				</Camera>
			</View>	
		)
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

    padding: 10,
    margin: 40
  }
});

module.exports = TakePicture;
