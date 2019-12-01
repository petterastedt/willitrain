import React, { useState } from 'react';

export default function Button(props) {
  const [buttonIsClicked, setButtonIsClicked] = useState(false)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

  const getWeatherReport = () => {
    setButtonIsClicked(true)

    setTimeout(() => {
      props.getWeather()
      setButtonIsDisabled(true)

      setTimeout(() => {
        setButtonIsDisabled(false)
      }, 5000)
    }, 500)
  }

  return (

    <div className="button ">
      <button
        className={`button-trigger h3 ${buttonIsClicked && "button--isClicked"}`}
        onClick={() => getWeatherReport()}
        disabled={buttonIsDisabled}>
        FIND OUT</button>
    </div>
  )
}
