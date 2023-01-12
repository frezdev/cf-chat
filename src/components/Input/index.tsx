import React from 'react'
import './styles.css'

interface InputProps {
  type: string,
  name?: string,
  value: string,
  styleClass?: string,
  styles?: object,
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = (props) => {
  const {
    placeholder,
    styleClass,
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