import React, { useState } from 'react';

export default function Button(props) {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const getWeatherReport = () => {
    props.getWeather()
    setButtonIsDisabled(true)
    setTimeout(() => {
      setButtonIsDisabled(false)
    }, 5000)
  }

  return (

    <div className="button">
      <button
        className="button-trigger h3"
        onClick={() => getWeatherReport()}
        disabled={buttonIsDisabled}>
        FIND OUT</button>
    </div>
  )
}
