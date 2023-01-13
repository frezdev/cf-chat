import React, { MouseEventHandler } from 'react'
import './Buttom.css'

interface ButtomProps {
  type?: 'button' | 'submit' | 'reset'
  text: any,
  styles?: object,
  styleClass?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Buttom: React.FC<ButtomProps> = (props) => {
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