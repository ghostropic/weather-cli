#! /usr/bin/env node

const yargonaut = require('yargonaut')
const yargs = require('yargs')
const chalk = require('chalk');
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
      describe: 'address or zip code to fetch weather',
      string: true // always parse address as a string
    }
  })
  .help('help', 'h')
  .argv

  const encoded_address = encodeURIComponent(`${argv.address}`)
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=${process.env.WEATHER_APP}`

  axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      console.log('')
      throw new Error(chalk.hex('#e26150')('unable to find location :(', '\n'))
    }

    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lat
    const weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY}/${lat},${lng}`
    console.log('')
    console.log(chalk.hex('#e2b574')('Current Weather'))
    console.log(chalk.hex('#7ACfC5')(`------------------------`))
    console.log('')
    console.log(chalk.hex('#E680C6').bold(response.data.results[0].formatted_address), '\n')
    return axios.get(weatherUrl)
  }).then((response) => {
    const temperature = response.data.currently.temperature
    const apparent_temperature = response.data.currently.apparentTemperature
    console.log(chalk.hex('#C4C4C4')(`it's currently ${chalk.hex('#C9A0F0').bold(temperature)} ℉`))
    console.log(chalk.hex('#C4C4C4')(`It feels like ${chalk.hex('#C9A0F0').bold(apparent_temperature)} ℉`, '\n'))
    console.log(chalk.hex('7acfc5')(`------------------------`))
    console.log('')
  }).catch((e) => {
    if (e.code === 'ECONNREFUSED') {
      console.log('refused')
    } else {
      console.log(e.message)
    }
  })