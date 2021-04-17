export default {

  async fetchWeatherData(woeid) {
    try {
      const proxyUrl = 'https://damp-sierra-82917.herokuapp.com/',
            targetUrl = `https://www.metaweather.com/api/location/${woeid}`

      const response = await fetch(proxyUrl + targetUrl)
      const jsonResponse = await response.json()

      return jsonResponse
    } catch (error) {
      console.log('Error fetching weather data: ', error)
    }
  },

  async fetchLocationData(param, param2) {
    try {
      const proxyUrl = 'https://damp-sierra-82917.herokuapp.com/'
      let targetUrl

      if (param2) targetUrl = `https://www.metaweather.com/api/location/search/?lattlong=${param},${param2}`
      else targetUrl = `https://www.metaweather.com/api/location/search/?query=${param}`

      const response = await fetch(proxyUrl + targetUrl)
      const jsonResponse = await response.json()

      return jsonResponse
    } catch (error) {
      console.log('Error fetching woeid data: ', error)
    }
  }
}
