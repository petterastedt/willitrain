import React from 'react'

 const location = (props) => {
  return (
    <div className="location">
      {/* <div className="location-pinWrapper">
        <div className="location-pin"></div>
      </div> */}
      <div className="h4 location-title">{props.location[0].title}</div>
    </div>
  )
}

export default location;