const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=cc580620ea7a4fe6d3867ccd6e9dbdd6&query=' +
		latitude +
		',' +
		longitude;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather stack.', undefined);
		} else if (body.error) {
			callback('unable to find the location.', undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					': It is currently ' +
					body.current.temperature +
					' degrees out. But it feels like ' +
					body.current.feelslike +
					' degrees out. There is a humidity level of ' +
					body.current.humidity +
					' forecasted. The UV index will be ' +
					body.current.uv_index +
					' today.'
			);
		}
	});
};

module.exports = forecast;
