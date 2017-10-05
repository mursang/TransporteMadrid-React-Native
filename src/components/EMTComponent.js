import React, {Component} from 'react';
import { Text, View, TextInput, ListView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Input } from './common';
import Constants from '../Constants';
import { busNumberChanged, searchStop, getFavorites } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';
import BusFavoriteItem from './BusFavoriteItem';


class EMTComponent extends Component {

	componentWillMount(){
		this.props.getFavorites();
		this.initListView(this.props);
	}

	componentWillReceiveProps(nextProps){
		this.initListView(nextProps);
	}

	initListView(props){
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(props.favoritesList);
	}

	onTextChange(text){
		this.props.busNumberChanged(text);
	}

	submit() {
		this.props.searchStop(this.props.busStopNumber);
	}


	showFavoritesView(){
		if (this.props.favoritesList.length == 0){
			return (
				<View>
					<Text style={styles.textNoFavorites}>
						¡Vaya! Aún no tienes paradas favoritas
					</Text>
				</View>
			);
		}else{
			return (
				<ListView 
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
					style={styles.listViewStyle}
				/>
			);
		}
	}


	renderRow(fav){
		return  <BusFavoriteItem fav={fav} onPress={() => {
			this.props.searchStop(fav.stopNumber);
		}}/>;
	}

	showErrorAlert() {
		if (this.props.errorMessage != null){
			//let loading screen some time to disappear
			setTimeout(() => {
				Alert.alert(
	         	'Vaya.. parece que hay algún problema'
	      		);
			}, 100);
		}
	}

	render(){
		return(
			<View style={styles.mainContainerStyle}>
				<Spinner visible={this.props.loading} textContent={"Cargando..."} textStyle={{color: 'white'}} />
				{this.showErrorAlert()}
				<View>
					<Input 
					placeholder="Número de parada" 
					onChangeText={this.onTextChange.bind(this)}
					value={this.props.busStopNumber}
					onSubmitEditing={this.submit.bind(this)}
					returnKeyType="done"/>
					<View style={styles.viewFavorites}>
						<Text style={styles.textHeaderFavorites}>
							Mis paradas favoritas
						</Text>
					</View>
				</View>
				{this.showFavoritesView()}
			</View>
			
		);
	}
}

const styles={
	mainContainerStyle: {
		backgroundColor: Constants.blueColor, 
		flex: 1
	},
	textNoFavorites: {
		color: 'white', 
		fontWeight: 'bold', 
		fontSize: 18, 
		textAlign: 'center', 
		alignItems: 'center', 
		alignSelf: 'center', 
		marginTop: 50
	},
	viewFavorites: {
		backgroundColor: 'white', 
		height: 40, 
		marginTop: 50
	},
	textHeaderFavorites: {
		color: Constants.blueColor, 
		fontWeight: 'bold', 
		textAlign: 'center', 
		fontSize: 18, 
		paddingTop: 9
	},
	listViewStyle: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10
	}
};

const mapStateToProps = (state) => {
	const { busStopNumber, loading, favoritesList, errorMessage } = state.bus;
	return { busStopNumber, loading, favoritesList, errorMessage };
};

export default connect(mapStateToProps, { busNumberChanged, searchStop, getFavorites })(EMTComponent);