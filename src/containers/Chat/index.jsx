import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '@/components/Message'
import SendIcon from '@mui/icons-material/Send'
import Input from '@/components/Input'
import Buttom from '@/components/Button'
import { getMessages } from '@/services/chatsSevices'
import { useCongigAutorization } from '@/utils/configAuthorization'
import formatTime from '@/utils/formatTime'
import { chatReducer } from '@/redux/slices/chatSlice'

import './Chat.css'

const Chat = ({ socket }) => {
  const user = useSelector(state => state.user)
  const { id: chatId, receiverId } = useSelector((state) => state.currentChat)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('');

  const [oldMessages, setOldMessages] = useState([])
  const { configRequest } = useCongigAutorization()
  const container = useRef()

  useEffect(() => {
    socket.emit('newChat', chatId)
  }, [])

  useEffect(() => {
    socket.on('sendMessage', message => {
      setMessages([...messages, message])
    })
  }, [messages])

  useEffect(() => {
    (async () => {
      const data = await getMessages(chatId, configRequest)
      setOldMessages([...data])
    })()
    setOldMessages([])
    setMessages([])
  }, [chatId])

  useEffect(() => {
    container.current.scroll(0, container.current.scrollHeight * 2)
  }, [messages, oldMessages])

  const handleSubmit = (event) => {
    event.preventDefault()
    socket.emit('newMessage', {
      message: {
        text: event.target.myMessage.value,
        sender: user.userId,
        chatId,
        hour: formatTime()
      },
      chatId,
      receiverId
    })
    setInputValue('')
  }

  return (
    <div className='MainChatContainer'>
      <div className='chatContainer'>
        <header className='chatHeader'>Chat ID: { chatId }</header>
        <ol ref={container} className='messagesContainer'>
          {oldMessages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </ol>
        <form className='chatForm' onSubmit={(e) => handleSubmit(e)}>
          <Input
            styles={{ marginRight: "1rem" }}
            type='text'
            placeholder='Escribe un mensaje aquí'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            name="myMessage"
          />
          <Buttom
            styles={{
              padding: "1rem",
              width: "auto"
            }}
            type='submit'
            styleClass='primary'
            disabled={inputValue.length < 1}
            text={<SendIcon sx={{ fontSize: 22 }} />}
          />
        </form>
      </div>
    </div>
  )
}

export default Chat