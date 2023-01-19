import React from 'react'
import './Buttom.css'


const Buttom = (props) => {
  const {
    type = 'button',
    text,
    styles,
    styleClass,
    disabled,
    onClick
  } = props

  return (
    <button
      className={`Button ${styleClass}`}
      style={styles}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Buttom