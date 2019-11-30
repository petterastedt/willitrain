import React from 'react'

 const header = () => {
  return (
    <div className="header">
      <div className="iconWrapper">
        <img
          src={require(`../../assets/icons/rainy.svg`)}
          alt="cloud-icon"
          className="header-icon"
        />
      </div>
      <h1 className="header-h1">WILL IT RAIN TODAY?</h1>
    </div>
  )
}

export default header;