import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import Utils from '../utils'


export default class NewReport extends Component {
	constructor(props){
		super(props);

		this.state = {
			categoryValue : 'Category',
			problemValue : 'Problem...',
			locationValue : 'Location...',
			pictureValue : 'Take Picture',
			cancelValue : 'Cancel',
			submitValue : 'Submit'
		};
	}

	render(){
		const { categoryValue } = this.state;
		const { problemValue } = this.state;
		const { locationValue } = this.state;

		return(
			<View>
				<View style = { styles.header }>
					<Text style = { styles.headerText }>New Report</Text>
				</View>

				<View style = { styles.criteria }>

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

					<TextInput style = { styles.textInput }
						onChangeText = {(text) => this.setState({ problemValue: text})}
						value = { this.state.problemValue }>	
					</TextInput>

					<TextInput style = { styles.textInput }
						onChangeText = {(text) => this.setState({ locationValue: text})}
						value = { this.state.locationValue }>
					</TextInput>
										
					<TouchableOpacity onPress={this._onPressButton}>
  		    	<View style = { styles.picture }>
							<Text style = { styles.text }>Snap a Photo</Text>			
						</View>
					</TouchableOpacity>

					<View style = { styles.inlineButtons }>

						<TouchableOpacity onPress={this._onPressButton}>
	  		    	<View style = { [styles.button, { backgroundColor: Utils.COLORS.grey }] }>
								<Text style = { styles.text }>Cancel</Text>			
							</View>
						</TouchableOpacity>
											
						<TouchableOpacity onPress={this._onPressButton}>
 	 		  	  	<View style = { [styles.button, { backgroundColor: Utils.COLORS.blue}] }>
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
		marginTop:			12,
		flexDirection: 'row',
	},
	button: {
		flex: 1,
    height: 					Utils.HEIGHT_UNIT,
    justifyContent: 	'center',
    paddingTop:				8,
    paddingBottom:		8,
		paddingLeft: 			20,
		paddingRight:			20,
    borderRadius: 		10,
    borderRadius: 		10,
    justifyContent: 	'center',
		marginLeft:				Utils.WIDTH_UNIT/2,
		marginRight:			Utils.WIDTH_UNIT/2,				
	},
	header: {
		height: 					Utils.HEIGHT_UNIT * 1.5,
		backgroundColor: 	Utils.COLORS.blue,
		flexDirection: 		'row',
		alignItems: 			'flex-end',
		justifyContent:		'center',
	},
	headerText: {
		marginBottom:			12,
		fontSize:					18,
    textAlign: 				'center',
    color: 						'#fff',
		alignItems:				'center',
  },
	text:{
		fontSize:					12,
		color:						'#000',
	},
	criteria:{
		marginTop:				60,
		alignItems: 			'center'
	},
	picker: {
		margin:						8,
		width: 						Utils.WIDTH_UNIT * 10,
		borderColor: 			Utils.COLORS.grey,	
	},
	textInput: {
		margin:						8,
		width: 						Utils.WIDTH_UNIT * 10,
		borderColor: 			Utils.COLORS.grey,	
	},
	picture:{
		margin:						10,
		padding:					8,
		borderWidth:		 	2,
		borderRadius:			Utils.HEIGHT_UNIT * .125,
		borderColor: 			Utils.COLORS.grey,	
		width: 						Utils.WIDTH_UNIT * 10,
	}

});

module.exports = NewReport;
