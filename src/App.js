import React, { useState, useEffect } from 'react';
import api from './api';
import './main.css';
import Header from './components/header/header';
import Button from './components/button/button';
import Location from './components/location/location';
import Loader from './components/loader/loader';
import Report from './components/report/report';
import Search from './components/search/search';
import Footer from './components/footer/footer';

function App() {
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [error, setError] = useState(null)
  const [weatherReport, setWeatherReport] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (sessionStorage.length > 0) {
      setTimeout(() => {
        setLocation([{
          title: sessionStorage.title,
          woeid: sessionStorage.woeid
        }])
      }, 2000)
   } else {
      getLocation()
    }
  }, [])

  const getLocation = async () => {
    if (navigator.geolocation) {
      const givePermissionError = setTimeout(() => setError("Please allow us to see your location"), 4000)

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(givePermissionError)
          setError("Getting your location..")
          const lat = position.coords.latitude.toFixed(10)
          const long = position.coords.longitude.toFixed(10)

          const locationData = await api.fetchLocationData(lat, long)

          if (!locationData) setError("Something went wrong when fetching your location.. (Weather API)")
          setLocation(locationData)
          sessionStorage.title = locationData[0].title
          sessionStorage.woeid = locationData[0].woeid
          setError(null)
        },
        (error) => {
          setError("Something went wrong when fetching your location..(Location API)")
          console.log('Error: ', error)
        }
      )
    } else {
      setError("Geolocation is not supported by this browser.")
    }
  }

  const searchLocation = async (searchInput) => {
    const searchInputFormatted = searchInput.split(' ').join('+')
    const locationData = await api.fetchLocationData(searchInputFormatted)

    if (locationData === undefined || locationData.length === 0) setError("Couldn't find location, try searching for a bigger city nearby")
    else setLocation(locationData)
  }

  const getWeather = async (woeid, day) => {
    error && setError(null)
    setLoadingWeather(true)

    const response = await api.fetchWeatherData(woeid)

    setLoadingWeather(false)

    if (response) {
      setWeatherData(response)
      getWeatherReport(day, response)
    } else {
      setError("Something went wrong when fetching the weather data..")
    }
  }

  const getWeatherReport = (day, data) => {
    let rainStatus

    if (data) rainStatus = data.consolidated_weather[day].weather_state_abbr
    else rainStatus = weatherData.consolidated_weather[day].weather_state_abbr

    const weatherReport = {
      'sn': 'It\'s gonna snow! 🌨️',
      'sl': 'Yuck, sleet today 😖',
      'h': 'It\'s gonna hail! Stay inside! 😬',
      't': 'Yes, looks like theres a storm coming ⛈️',
      'hr': 'Yes, a lot ☔',
      'lr': 'Yes, a little 🌧️',
      's': 'Yes, some showers 🌦️',
      'c': 'No 🌞',
      'hc': 'No, lots of clouds though ☁️',
      'lc': 'No, looks fine 🌤️',
      'default': 'Yikes, something went wrong! ❌'
    }

    setWeatherReport(weatherReport[rainStatus] || weatherReport['default'])
  }

  return (
    <div className="App">

      <Header />

      <div className="wrapper">
        { weatherReport &&
          <Report
            getWeatherReport={getWeatherReport}
            weatherReport={weatherReport}
            resetValues={() => setWeatherReport(null)}
          />
        }

        { loadingWeather &&
          <Loader/>
        }

        { location && !weatherReport && !loadingWeather &&
          <Button
            getWeather={() => getWeather(location[0].woeid, 0)}
          />
        }

        { location && !weatherReport && !loadingWeather &&
          <Location
            location={location}
          />
        }

        { location && !weatherReport && !loadingWeather &&
          <Search
            location={location}
            error={error}
            resetError={() => setError(null)}
            searchLocation={searchLocation}
          />
        }

        { error && <div className={`error ${error === "Couldn't find location, try searching for a bigger city nearby" && "error--isBlinking"}`}>{error}</div> }
      </div>
      <Footer />
    </div>
  );
}

export default App;
