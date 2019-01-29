const yargs = require('yargs')

const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

//object that stores final parsed output`
const argv = yargs
  .options({
    address: {
      alias: 'a',
      demand: true, //address is reqired
      describe: 'address to fetch weaather',
      string: true // always parse address as a string
    }
  })
  .help('help', 'h')
  .argv

  geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
      console.log(errorMess)
    } else {
      console.log('location:', result.address)
      weather.getWeather(result.latitude, result.longetude, (weather_result, errorMessage) => {
        if (weather_result) {
          console.log(`it's currently ${weather_result.temperature}. It feels like ${weather_result.apparentTemperature}.`)
        } else {
          console.log(errorMessage)
        }
      })
    }
  })