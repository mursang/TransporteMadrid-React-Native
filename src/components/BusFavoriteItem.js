import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Constants from '../Constants';


class BusFavoriteItem extends Component {
	render(){
		const { stopNumber, lines, customName } = this.props.fav; 
		return (
			<TouchableHighlight onPress={this.props.onPress}>
				<View style={styles.cellStyle}>
					<View style={styles.dataStyle}>
						<Text style={styles.title}>Parada número: {stopNumber}</Text>
						<Text style={styles.linesStyle}>Líneas: {lines}</Text>
					</View>
					
					<View style={styles.indicatorContainer}>
						<Text style={styles.indicatorStyle}>></Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = {
	cellStyle: {
		backgroundColor: 'white',
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 15,
		paddingTop: 15
	},
	dataStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	title: {
		color: Constants.blueColor,
		fontSize: 16,
		fontWeight: 'bold',
		paddingBottom: 10,
		marginLeft: 10
	},
	linesStyle: {
		color: 'black',
		fontWeight: '300',
		marginLeft: 10
	},
	indicatorContainer: {
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'flex-end'
	},
	indicatorStyle: {
		fontSize: 18,
		color: 'grey',
		paddingRight: 10
	}
};


export default BusFavoriteItem;