import React, { useState } from 'react';

export default function Report (props) {
  const [isAnimatedOut, setIsAnimatedOut] = useState(false)
  const [isAnimatedIn, setIsAnimatedIn] = useState(false)
  const [nextDayIsClicked, setNextDayIsClicked] = useState(false)

  const getTomorrow = () => {
    setIsAnimatedOut(true)

    setTimeout(() => {
      props.getWeatherReport(1)
      setIsAnimatedIn(true)
      setNextDayIsClicked(true)
    }, 700)
  }

  return (
    <div className="report">
      <div className={`h3 report-content ${isAnimatedOut && "report-content--isAnimatedOut"} ${isAnimatedIn && "report-content--isAnimatedIn"}`}>{props.weatherReport}</div>

      { !nextDayIsClicked ?
          <div
            className="report-nextDay"
            onClick={() => getTomorrow()}>
            How about tomorrow?
          </div>
        :
          <div
            className="report-back"
            onClick={() => props.resetValues()}>
            Want to try with a different location?
         </div>
      }
    </div>
  )
}
