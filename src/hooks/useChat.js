import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import socketIoClient  from 'socket.io-client'
import formatTime from '@/utils/formatTime'


const BASE_URL = import.meta.env.VITE_BASE_URL
const NEW_MESSAGE = 'newMessage'


const useChat = (chatId, userId, destinationUser = '') => {
  const { user } = useSelector((state) => state)
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = socketIoClient(BASE_URL, {
      query: { chatId, userId, destinationUser }
    })

    socketRef.current.on('connection', () => {
      console.log(socketRef.current)
    })

    //console.log(socketRef.current.id)

    socketRef.current.on(NEW_MESSAGE, (message) => {
      const incomingMessage = {
        ...message,
      }
      console.log(message)
      setMessages(prevState => [...prevState, incomingMessage])
    })

    socketRef.current.on('getMessages', (data) => {
      console.log(data)
    })
    socketRef.current?.emit('getMessages', chatId)


    return () => {
      socketRef.current?.disconnect()
    }

  }, [chatId])


  const sendMessage = (text) => {
    socketRef.current?.emit(NEW_MESSAGE, {
      sender: user?.userId,
      chatId,
      hour: formatTime(),
      text: text
    })
  }

  const getChats = (id) => {
    socketRef.current?.emit('getChats', )
  }

  return {
    messages,
    setMessages,
    sendMessage
  }
}

export default useChat