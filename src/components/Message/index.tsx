import React from 'react'
import './styles.css'

export interface MessageProps {
  text: string
  hour: string
  sender: boolean
}

const Message: React.FC<MessageProps> = ({ text, hour, sender = false }) => {
  return (
    <div className='messageContainer'>
      <li className={sender ? "sender message" : "receiver message"}>
        <div className='messageText'>
          <span>{text}</span>
        </div>
        <div className='messageHour'>
          <i>{hour}</i>
        </div>
      </li>
    </div>
  )
}

export default Message