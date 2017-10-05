import {Actions} from 'react-native-router-flux';
import { parseTimeFromStopNumber } from '../parser/EMTParser';
import {AsyncStorage} from 'react-native';
import Constants from '../Constants';

export const busNumberChanged = (text) => {
	return {
		type: 'BUS_NUMBER_CHANGED',
		payload: text
	};
};


export const searchStop = (text) => {
	return (dispatch) => {
		dispatch({type: 'SEARCH_STOP_NUMBER'});

		parseTimeFromStopNumber(text, function(results){
			if (results.status){
				dispatch({
					type: 'GOT_STOP_RESULTS',
					payload: results.payload
				});
				//GO TO DETAIL SCENE.
				Actions.busTimes();
			}else{
				dispatch({
					type: 'ERROR_RESULTS',
					payload: results.payload
				});
			}

		});
	};
};

export const getFavorites = () => {
	return (dispatch) => {
		AsyncStorage.getItem(Constants.favoritesKey).then((object) => {
			if (object != "null" && object){
				var array = JSON.parse(object);
				dispatch({type: 'GOT_FAVORITES', payload: array});
			}else{
				dispatch({type: 'GOT_FAVORITES', payload: []});
			}
		});
	}
};

export const resetFavorite = () => {
	return {
		type: 'REMOVE_FAVORITE'
	};
};

export const checkFavorite = (arrives) => {
	return (dispatch) => {
		var stopNumber = arrives[0].IdStop[0];
		AsyncStorage.getItem(Constants.favoritesKey).then((object) => { 
			if (object != "null" && object){
				//lets check.
				var myArray = JSON.parse(object);
				var finished = false;
				myArray.forEach((value) => {
					var myStop = value.stopNumber;
					if (stopNumber == myStop){
						//need this to get the main thread and update the image.
						setTimeout(() => {
					      dispatch({type: 'ADD_FAVORITE'});
					    }, 10);
						finished = true;
					}
				});
				
				if (!finished){
					dispatch({type: 'REMOVE_FAVORITE'});
				}
				
			}else{
				//not favorited.
				dispatch({type: 'REMOVE_FAVORITE'});
			}
		});
	}
}


function getStringLine(arrives) {
	var myLinesArray = [];
	arrives.forEach((value) => {
		var idLine = value.idLine[0];
		if (myLinesArray.indexOf(idLine) <= -1){
			myLinesArray.push(idLine);
		}
	});
	return myLinesArray.join();
}


export const addFavorite = (arrives) => {

	//fav: {stopNumber:'XX', lines: 'XX,XX,XX', customName:''}
	return (dispatch) => {
		var stopNumber = arrives[0].IdStop[0];
		//We have an array of favorites. [{...}, {....}]
		AsyncStorage.getItem(Constants.favoritesKey).then((object) => {
			if (object != "empty" && object){
				var myArray = JSON.parse(object);

				//is it new or is it a delete?
				var isADelete = false;
				var index = 0;
				myArray.forEach((value) => {
					var copyArray = myArray;
					var myStop = value.stopNumber;
					if (stopNumber == myStop){
						isADelete = true;
						//it's a delete.
						copyArray.splice(index, 1);
						if (copyArray.length == 0){
							AsyncStorage.setItem(Constants.favoritesKey, "empty").then(() => {
								dispatch({type: 'REMOVE_FAVORITE'});
								return;
							});
						}else{
							AsyncStorage.setItem(Constants.favoritesKey, JSON.stringify(copyArray)).then(() => {
								dispatch({type: 'REMOVE_FAVORITE'});
								return;
							});
						}	
					}
					index += 1;
				});
				//it's new.
				if (!isADelete){
					var myFav = {stopNumber: stopNumber, lines: getStringLine(arrives), customName: ''};

					myArray.push(myFav);
					AsyncStorage.setItem(Constants.favoritesKey, JSON.stringify(myArray));
					dispatch({type: 'ADD_FAVORITE'});
				}
				
			}else{
				var myFav = {stopNumber: stopNumber, lines: getStringLine(arrives), customName: ''};

				var array = [];
				array.push(myFav);
				AsyncStorage.setItem(Constants.favoritesKey, JSON.stringify(array));
				dispatch({type: 'ADD_FAVORITE'});
			}
		});
	}
	

	
};