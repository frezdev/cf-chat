import React, { MouseEventHandler } from 'react'
import './styles.css'

interface ButtomProps {
  type?: 'button' | 'submit' | 'reset'
  text: string,
  styles?: object,
  styleClass?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Buttom: React.FC<ButtomProps> = ({type = 'button', text, styles, styleClass, onClick}) => {
  return (
    <button
      className={`Button ${styleClass}`}
      style={styles}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Buttom