import React, { Component } from 'react';
import { Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import { addFavorite, checkFavorite, resetFavorite } from '../actions';

class FavoriteButton extends Component {	
	onPressButton(){



		this.props.addFavorite(this.props.arrives);
	}

	componentWillMount(){
		this.props.checkFavorite(this.props.arrives);
	}

	componentWillUnmount(){
		this.props.resetFavorite();
	}

	render(){
		return (
			<TouchableHighlight onPress={this.onPressButton.bind(this)} underlayColor={Constants.blueColor}>
				<Image style={styles.button} source={this.props.imageUri}/>
		    </TouchableHighlight>
		);
	}
}

const styles = {
	button: {
		height: 22,
		width: 22,
		marginRight: 10	
	}
}

const mapStateToProps = (state) => {
	const { arrives, imageUri } = state.bus;
	return { arrives, imageUri };
};

export default connect(mapStateToProps, { addFavorite, checkFavorite, resetFavorite })(FavoriteButton);