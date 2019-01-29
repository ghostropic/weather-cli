const request = require('request')

geocodeAddress = (address, callback) => {
  const encoded_address = encodeURIComponent(`${address}`)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=${process.env.WEATHER_APP}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('unable to find address or location')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longetude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports.geocodeAddress = geocodeAddress