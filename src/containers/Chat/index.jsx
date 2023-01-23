import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatsReducer } from '@/redux/slices/chatsSlice'
import Message from '@/components/Message'
import SendIcon from '@mui/icons-material/Send'
import Input from '@/components/Input'
import Buttom from '@/components/Button'
import formatTime from '@/utils/formatTime'

import './Chat.css'

const Chat = ({ socket, chatId }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [currentChatId, setCurrentChatId] = useState('')
  const user = useSelector(state => state.user)
  const { receiverId } = useSelector((state) => state.currentChat)
  const { chats } = useSelector(state => state.chatsState)
  const container = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    socket.emit('exit', currentChatId)
    socket.emit('newChat', chatId)
    setCurrentChatId(chatId)

    const currentChat = chats.find(chat => {
      return chat.id === chatId
    })
    setMessages([...currentChat.messages])
  }, [chatId])

  useEffect(() => {

    socket.on('sendMessage', message => {
      const currentChat = chats.find(chat => {
        return chat.id === chatId
      })

      const updateMessages = chats.map(chat => {
        if (chat.id === chatId) {
          chat = {...chat, messages: [...chat.messages, message]}
        }
        return chat
      })

      if (chatId === message.chatId) {
        console.log({chatId: chatId, messageChatId: message.chatId})
        dispatch(chatsReducer({ chats: [...updateMessages]}))
        setMessages([...messages, message])
      }
    })
  }, [messages])

  useEffect(() => {
    container.current.scroll(0, container.current.scrollHeight * 2)
  }, [messages, chatId])

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
          {messages.map((message, index) => (
            <Message key={message.id || index} {...message} />
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