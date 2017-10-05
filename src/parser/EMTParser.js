import Constants from '../Constants';


export const parseTimeFromStopNumber = (text, callback) => {
	var parseString = require('react-native-xml2js').parseString;

	var serviceDetail = "getArriveStop?";
	let finalURL = Constants.serviceURL+serviceDetail+"idClient="+Constants.serviceClient+"&passKey="+Constants.passKey+"&idStop="+text+"&statistics=&cultureInfo="
	fetch(finalURL, {
		method: 'GET'
	})
	.then((response) => {
		var xml = response._bodyText;
		parseString(xml, function (err, result) {
			if (result.Arrives == ""){
				var res = {status: false, payload: "Parada no válida"}
				callback(res);
				return;
			}
			var myArrives = result.Arrives.Arrive;
			var res = {status: true, payload: myArrives};
		    callback(res);
		});
	})
	.catch((error) => {
		var res = {status: false, payload: error};
		callback(res);
	});
};