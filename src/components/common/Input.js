import React from 'react';
import { Text, View, TextInput } from 'react-native';
import Constants from '../../Constants';


const Input = ({value, placeholder, onChangeText, onSubmitEditing, returnKeyType}) => {
	const { inputStyle, containerStyle } = styles;

	return (
		<View style={containerStyle}>
			<TextInput 
				placeholder={placeholder}
				autoCorrect={false}
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
				placeholderTextColor="black"
				onSubmitEditing={onSubmitEditing}
				returnKeyType={returnKeyType}
				underlineColorAndroid='transparent'
			/>
		</View>
	);
};

const styles = {
	inputStyle: {
		color: Constants.blueColor,
		paddingRight: 70,
		paddingLeft: 70,
		fontSize: 18,
		height:50,
		width: 320,
		borderBottomWidth: 0,
		textAlign: 'center',
		borderWidth: 2,
		borderColor: Constants.blueColor,
		borderRadius: 20,
		backgroundColor: 'white',
		marginTop: 10
	},
	containerStyle: {
		flex: 1,
		alignItems: 'center'	
	}
};

export { Input };