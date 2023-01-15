import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import './Message.css'

export interface MessageProps {
  text: string
  hour: string
  sender: string
  id: string
}

const Message: React.FC<MessageProps> = (props) => {
  const { text, hour, sender } = props
  const { user } = useSelector((state: RootState) => state)

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