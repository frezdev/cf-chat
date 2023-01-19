import React from 'react'
import './Input.css'

const Input = (props) => {
  const {
    placeholder,
    styleClass = '',
    styles,
    value,
    type,
    name,
    onChange
  } = props

  return (
    <input
      style={styles}
      className={`Input ${styleClass}`}
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  )
}

export default Input