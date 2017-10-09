const INITIAL_STATE = { busStopNumber: '', loading: false, arrives: {}, imageUri: require('../images/star_empty.png'), favoritesList: [], errorMessage: null, refresh: false};

export default (state = INITIAL_STATE, action) => {
	switch (action.type){
		case 'BUS_NUMBER_CHANGED':
			return {...state, busStopNumber: action.payload, errorMessage: null};
		case 'SEARCH_STOP_NUMBER':
			return {...state, loading: true, errorMessage: null};
		case 'GOT_STOP_RESULTS':
			return {...state, arrives: action.payload, loading:false, errorMessage: null};
		case 'ERROR_RESULTS':
			return {...state, errorMessage: action.payload, loading:false};
		case 'ADD_FAVORITE':
			return {...state, imageUri: require('../images/star_filled.png'), errorMessage: null};
		case 'REMOVE_FAVORITE':
			return {...state, imageUri: require('../images/star_empty.png'), errorMessage: null};
		case 'GOT_FAVORITES':
			return {...state, favoritesList: action.payload, errorMessage: null};
		case 'REFRESH_VIEW':
			return {...state, refresh: true};
		case 'RESET_REFRESH':
			return {...state, refresh: false};
		default:
			return state;
	}
};