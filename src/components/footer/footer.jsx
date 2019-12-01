import React from 'react'

 const footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        Created by <a href="https://github.com/petterastedt" target="_blank" rel="noopener noreferrer" aria-label="github link">Petter Åstedt</a>.
        This website is using <a href="https://www.metaweather.com" target="_blank" rel="noopener noreferrer" aria-label="link to metaweather api">MetaWeather API</a> for accurate weather predictions.
      </div>
    </div>
  )
}

export default footer;