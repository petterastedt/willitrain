import React, { useState } from 'react';

export default function Report (props) {
  const [isAnimatedOut, setIsAnimatedOut] = useState(false)
  const [isAnimatedIn, setIsAnimatedIn] = useState(false)

  const getTomorrow = () => {
    setIsAnimatedOut(true)
    setTimeout(() => {
      props.getWeatherReport(1)
      setIsAnimatedIn(true)
    }, 700)
  }

  return (
    <div className="report">
      <div className={`h4 report-content ${isAnimatedOut && "report-content--isAnimatedOut"} ${isAnimatedIn && "report-content--isAnimatedIn"}`}>{props.weatherReport}</div>
      <div
        className="report-nextDay"
        onClick={() => getTomorrow()}>
        How about tomorrow?
      </div>
    </div>
  )
}
