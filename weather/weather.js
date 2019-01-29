const request = require('request')

const getWeather = (lat, lng, callback) => {

  request({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback({
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback('unable to fetch weather')
    }
  })
}

module.exports.getWeather = getWeather