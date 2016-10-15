import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Image } from 'react-native';
import Utils from '../utils'


export default class NewReport extends Component {
	constructor(props){
		super(props);

		this.state = {
			categoryValue : 'Category',
			problemValue : '',
			locationValue : '',
			urgencyValue : '',
			pictureValue : 'Take Picture',
			cancelValue : 'Cancel',
			submitValue : 'Submit'
		};
	}

	render(){
		const { categoryValue } = this.state;
		const { problemValue } = this.state;
		const { locationValue } = this.state;
		const { urgencyValue } = this.state;

		return(
			<View>
				<View style = { styles.header }>
					<Text style = { styles.headerText }>New Report</Text>
				</View>

				<View style = { styles.criteria }>
					
					<View style={styles.pickerContainer}>
						<Picker
							style = { styles.picker }
	  					selectedValue={ categoryValue }
	  					onValueChange={ this.onValueChange.bind(this, 'categoryValue')}>
	  					<Picker.Item label="Category" value="Category" />
	  					<Picker.Item label="General" value="General" />
	  					<Picker.Item label="Smoking" value="Smoking" />
	  					<Picker.Item label="Material Request" value="MaterialRequest" />
	  					<Picker.Item label="Noise Complaint" value="NoiseComplaint" />
						</Picker>
					</View>


					<TextInput style = { styles.textInput }
						onChangeText = {(text) => this.setState({ problemValue: text})}
						placeholder = { 'Problem...' }>	
					</TextInput>

					<TextInput style = { styles.textInput }
						onChangeText = {(text) => this.setState({ locationValue: text})}
						placeholder = { 'Location...' }>
					</TextInput>
										
					<View style={styles.pickerContainer}>
						<Picker
							style = { styles.picker }
	  					selectedValue={ urgencyValue }
	  					onValueChange={ this.onValueChange.bind(this, 'urgencyValue')}>
	  					<Picker.Item label="Urgency" value="Urgency" />
	  					<Picker.Item label="Low" value= "Low" />
	  					<Picker.Item label="Medium" value="Medium" />
	  					<Picker.Item label="High" value="High" />
						</Picker>
					</View>
										
					<TouchableOpacity onPress={this.props.takePicture}>
  		    	<View style = { styles.picture }>
							<Text style={[styles.text, styles.cameraText]}>Snap a Photo</Text>		
							<Image style={styles.camera}source={require('../img/camera.png')}/>
						</View>
					</TouchableOpacity>

					<View style = { styles.inlineButtons }>

						<TouchableOpacity style={styles.button} onPress={this.props.submit}>
	  		    	<View style = {[ styles.buttonInside, { backgroundColor: Utils.COLORS.grey }]}>
								<Text style = { styles.text }>Cancel</Text>			
							</View>
						</TouchableOpacity>
											
						<TouchableOpacity style={styles.button} onPress={this.props.submit}>
 	 		  	  	<View style = { [styles.buttonInside, { backgroundColor: Utils.COLORS.blue} ]}>
												<Text style = { [styles.text, { color: '#fff'}] }>Submit</Text>

							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	onValueChange = (key: string, value: string) =>{
		const newState = {};
		newState[key] = value;
		this.setState(newState);
	}
}

const styles = StyleSheet.create({
	inlineButtons:{
				margin:				Utils.WIDTH_UNIT/2,
		flexDirection: 'row',
	},
	button: {
		flex: 1,
    height: 					Utils.HEIGHT_UNIT,
		marginLeft:				Utils.WIDTH_UNIT/2,
		marginRight:			Utils.WIDTH_UNIT/2,			
		alignItems: 'stretch',

	},
	buttonInside: {
		borderRadius: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	},
	header: {
		height: 					Utils.HEIGHT_UNIT * 1.5,
		backgroundColor: 	Utils.COLORS.blue,
		flexDirection: 		'row',
		alignItems: 			'center',
	},
	headerText: {
		flex: 1,
		textAlign: 'center',
    color: 						'#fff',
    fontWeight: '600'
  },
	text:{
		color:						'#000',
	},
	criteria:{
		marginTop:				60,
		alignItems: 			'center'
	},
	pickerContainer: {
		margin:						8,
		width: 						Utils.WIDTH_UNIT * 14,
		height: Utils.HEIGHT_UNIT * 1.5,
		borderWidth:			2,
		borderColor: 			Utils.COLORS.grey,	
	},
	textInput: {
		margin:						8,
		width: 						Utils.WIDTH_UNIT * 14,
		paddingLeft: Utils.WIDTH_UNIT * 0.5,
		height: Utils.HEIGHT_UNIT * 1.5,
		borderWidth:			2,
		borderColor: 			Utils.COLORS.grey,	
	},
	picture:{
		margin:						8,
		padding:					8,
		borderWidth:		 	2,
		borderRadius:			Utils.HEIGHT_UNIT * .125,
		borderColor: 			Utils.COLORS.grey,	
		width: 						Utils.WIDTH_UNIT * 10,
		flexDirection: 'row'
	},
	cameraText: {
		flex: 8,
	},
	camera: {

	}

});

module.exports = NewReport;
