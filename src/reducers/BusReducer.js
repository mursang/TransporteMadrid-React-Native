const INITIAL_STATE = { busStopNumber: '', loading: false, arrives: {}, imageUri: require('../images/star_empty.png'), favoritesList: []};

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case 'BUS_NUMBER_CHANGED':
			return {...state, busStopNumber: action.payload};
		case 'SEARCH_STOP_NUMBER':
			return {...state, loading: true};
		case 'GOT_STOP_RESULTS':
			return {...state, arrives: action.payload, loading:false};
		case 'ERROR_RESULTS':
			//TODO!
			return {...state};
		case 'ADD_FAVORITE':
			return {...state, imageUri: require('../images/star_filled.png')};
		case 'REMOVE_FAVORITE':
			return {...state, imageUri: require('../images/star_empty.png')};
		case 'GOT_FAVORITES':
			return {...state, favoritesList: action.payload};
		default:
			return state;
	}
};