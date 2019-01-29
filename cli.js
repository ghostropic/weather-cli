#! /usr/bin/env node

const yargonaut = require('yargonaut')
const yargs = require('yargs')
const axios = require('axios')

require('yargonaut')
  .style('blue')
  .errorsStyle('red')

//object that stores final parsed output`
const argv = yargs
  .options({
    address: {
      alias: ['a', 'z'],
      demand: true, //address is reqired
      describe: 'zip code or address to fetch weather',
      string: true // always parse address as a string
    }
  })
  .help('help', 'h')
  .argv

  const encoded_address = encodeURIComponent(`${argv.address}`)
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=${process.env.WEATHER_APP}`

  axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('unable to find location :(')
    }

    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lat
    const weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat},${lng}`

    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl)
  }).then((response) => {
    const temperature = response.data.currently.temperature
    const apparent_temperature = response.data.currently.apparentTemperature
    console.log(`it's currently ${temperature}. It feels like ${apparent_temperature}`)
  }).catch((e) => {
    if (e.code === 'ECONNREFUSED') {
      console.log('refused')
    } else {
      console.log(e.message)
    }
  })