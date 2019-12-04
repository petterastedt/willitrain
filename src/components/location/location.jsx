import React from 'react'

 const location = (props) => {
  return (
    <div className="location">
      <div className="h4 location-title">{props.location[0].title}</div>
    </div>
  )
}

export default location;