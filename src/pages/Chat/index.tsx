import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Message from '@/components/Message'
import useChat from '@/hooks/useChat'
import SendIcon from '@mui/icons-material/Send'
import './styles.css'

const Chat: React.FC = () => {
  const { id } = useParams()
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage } = useChat(id)
  const container: any = useRef()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    sendMessage(event.target.myMessage.value)
    setInputValue('')
  }

  useEffect(() => {
    container.current.scroll(0, container.current.scrollHeight * 2)
  }, [messages])

  return (
    <>
      <h2 className='chatId'>Chat ID: { id }</h2>
      <div ref={container} className='chatContainer'>
        <ol className='messagesContainer'>
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </ol>
        <form className='chatForm' onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder='Escribe un mensaje aquí'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            name="myMessage"
          />
          <button disabled={inputValue.length < 1}>
            <SendIcon sx={{ fontSize: 22 }} />
          </button>
        </form>
      </div>
    </>
  )
}

export default Chat