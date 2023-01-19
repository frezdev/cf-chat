import React from 'react'
import { useSelector } from 'react-redux'
import './Message.css'


const Message = (props) => {
  const { text, hour, sender } = props
  const { user } = useSelector((state) => state)

  return (
    <div className='messageContainer'>
      <li className={sender === user?.userId ? "sender message" : "receiver message"}>
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