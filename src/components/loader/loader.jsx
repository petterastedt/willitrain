import React from 'react'

 const loader = (props) => {
  return (
    <div className="loader-wrapper">
      <div className={`loader ${props.isSmall && "loader--isSmall"}`}></div>
    </div>
  )
}

export default loader